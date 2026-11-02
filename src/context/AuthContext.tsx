import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User;
  role: UserRole;
  isLoading: boolean;
  login: (role: UserRole, email?: string, password?: string, name?: string) => Promise<User>;
  register: (name: string, email: string, department: string, password?: string, role?: UserRole) => Promise<User>;
  switchRole: (role: UserRole) => Promise<User>;
  logout: () => Promise<void>;
  notificationCount: number;
  clearNotifications: () => void;
}

const defaultUser: User = {
  id: 'usr_init',
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notificationCount, setNotificationCount] = useState<number>(3);

  useEffect(() => {
    authService.getCurrentUser().then(savedUser => {
      if (savedUser) setUser(savedUser);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, []);

  const login = async (newRole: UserRole, email?: string, password?: string, name?: string) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(newRole, email, password, name);
      setUser(loggedUser);
      setIsLoading(false);
      return loggedUser;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (name: string, email: string, department: string, password?: string, role: UserRole = 'student') => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(name, email, department, password, role);
      setUser(newUser);
      setIsLoading(false);
      return newUser;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const switchRole = async (newRole: UserRole) => {
    setIsLoading(true);
    const updatedUser = await authService.switchRole(newRole);
    setUser(updatedUser);
    setIsLoading(false);
    return updatedUser;
  };

  const logout = async () => {
    await authService.logout();
    const guestUser: User = {
      id: 'usr_guest',
      name: 'Guest User',
      email: 'guest@college.edu',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Guest&backgroundColor=173b63,2f9c95',
      department: 'Computer Science & AI',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: '20240001',
      semester: '6th Semester',
      gpa: 3.8
    };
    setUser(guestUser);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user.role,
        isLoading,
        login,
        register,
        switchRole,
        logout,
        notificationCount,
        clearNotifications
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
