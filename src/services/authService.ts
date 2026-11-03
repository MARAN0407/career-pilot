import { User, UserRole } from '../types';
import { ApiService, delay } from './api';

const CURRENT_USER_KEY = 'current_user';

export const authService = {
  async getCurrentUser(): Promise<User> {
    const cached = ApiService.getItem<User | null>(CURRENT_USER_KEY, null);
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data && data.user) {
          ApiService.setItem(CURRENT_USER_KEY, data.user);
          return data.user;
        }
      }
    } catch (err) {
      console.warn('Backend /api/auth/me unavailable, using local session');
    }

    if (cached) return cached;

    // Default student user
    const defaultStudent: User = {
      id: 'usr_default_ilamaran',
      name: 'Ilamaran',
      email: 'ilamaran@college.edu',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ilamaran&backgroundColor=173b63,2f9c95',
      department: 'Computer Science & AI',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: '20240982',
      semester: '6th Semester',
      gpa: 3.88
    };
    ApiService.setItem(CURRENT_USER_KEY, defaultStudent);
    return defaultStudent;
  },

  async login(role: UserRole, email?: string, password?: string, name?: string, department?: string): Promise<User> {
    const loginIdent = (email || name || 'ilamaran@college.edu').trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginIdent, password, role, username: name, department })
      });

      if (res.ok) {
        const json = await res.json();
        if (json && json.user) {
          ApiService.setItem(CURRENT_USER_KEY, json.user);
          return json.user;
        }
      }
    } catch (e) {
      console.warn('Connecting to backend failed during login, using local provisioning fallback', e);
    }

    // Dynamic fallback provisioning
    let displayName = name ? name.trim() : loginIdent;
    if (displayName.includes('@')) {
      displayName = displayName.split('@')[0];
    }
    displayName = displayName.replace(/[._-]+/g, ' ');
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    const user: User = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email: loginIdent.includes('@') ? loginIdent : `${loginIdent.toLowerCase()}@college.edu`,
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=173b63,2f9c95`,
      department: department || 'Electronics & Communication Engineering (ECE)',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: `2024${Math.floor(1000 + Math.random() * 9000)}`,
      semester: '6th Semester',
      gpa: 3.88
    };

    ApiService.setItem(CURRENT_USER_KEY, user);
    return user;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.user) {
          ApiService.setItem(CURRENT_USER_KEY, json.user);
          return json.user;
        }
      }
    } catch (e) {
      console.warn('Backend updateProfile failed, updating local state', e);
    }

    const current = await this.getCurrentUser();
    const updated = { ...current, ...updates };
    ApiService.setItem(CURRENT_USER_KEY, updated);
    return updated;
  },

  async register(name: string, email: string, department: string, password?: string, role: UserRole = 'student'): Promise<User> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, department, password, role })
      });

      if (res.ok) {
        const json = await res.json();
        if (json && json.user) {
          ApiService.setItem(CURRENT_USER_KEY, json.user);
          return json.user;
        }
      }
    } catch (e) {
      console.warn('Backend register failed, using local registration', e);
    }

    const user: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=173b63,2f9c95`,
      department: department || 'Computer Science & AI',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: `2024${Math.floor(1000 + Math.random() * 9000)}`,
      semester: '6th Semester',
      gpa: 3.85
    };

    ApiService.setItem(CURRENT_USER_KEY, user);
    return user;
  },

  async switchRole(role: UserRole): Promise<User> {
    const current = await this.getCurrentUser();
    const updated = {
      ...current,
      role,
      title: role === 'tutor' ? 'Associate Professor & Research Chair' : undefined
    };
    ApiService.setItem(CURRENT_USER_KEY, updated);
    return updated;
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore
    }
    const defaultStudent: User = {
      id: 'usr_guest',
      name: 'Guest Student',
      email: 'student@college.edu',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Guest&backgroundColor=173b63,2f9c95',
      department: 'Computer Science & AI',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: '20240001',
      semester: '6th Semester',
      gpa: 3.8
    };
    ApiService.setItem(CURRENT_USER_KEY, defaultStudent);
  }
};
