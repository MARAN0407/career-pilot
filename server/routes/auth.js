import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

const router = express.Router();

// Helper to read users
function readUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error reading users.json, initializing empty array', err.message);
  }
  return [];
}

// Helper to save users
function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing users.json', err.message);
  }
}

// Format readable name from email or raw name
function formatDisplayName(input) {
  if (!input) return 'User';
  let cleaned = input.trim();
  if (cleaned.includes('@')) {
    cleaned = cleaned.split('@')[0];
  }
  // Replace dots, underscores, dashes with spaces
  cleaned = cleaned.replace(/[._-]+/g, ' ');
  // Capitalize words
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

// Current logged in user in-memory session
let currentSessionUser = null;

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, department, role, college } = req.body;

  if (!email && !name) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const users = readUsers();
  const userEmail = (email || `${(name || 'user').toLowerCase().replace(/\s+/g, '')}@college.edu`).toLowerCase();
  
  const existingUserIndex = users.findIndex(u => u.email.toLowerCase() === userEmail);
  const displayName = name ? name.trim() : formatDisplayName(userEmail);

  const newUser = {
    id: `usr_${Date.now()}`,
    name: displayName,
    email: userEmail,
    role: role || 'student',
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=173b63,2f9c95,7567c7`,
    department: department || 'Computer Science & AI',
    institution: college || 'Apex Institute of Technology & Sciences',
    registerNumber: `2024${Math.floor(1000 + Math.random() * 9000)}`,
    semester: '6th Semester',
    gpa: 3.85,
    title: role === 'tutor' ? 'Associate Professor & Research Chair' : undefined
  };

  if (existingUserIndex >= 0) {
    users[existingUserIndex] = { ...users[existingUserIndex], ...newUser, id: users[existingUserIndex].id };
    currentSessionUser = users[existingUserIndex];
  } else {
    users.push(newUser);
    currentSessionUser = newUser;
  }

  writeUsers(users);

  res.json({
    success: true,
    message: 'Registration successful',
    user: currentSessionUser,
    token: `token_${Date.now()}`
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, username, password, role, department } = req.body;
  const loginIdentifier = (email || username || '').trim();

  if (!loginIdentifier) {
    return res.status(400).json({ success: false, message: 'Please provide an email or username.' });
  }

  const users = readUsers();
  const lowerIdent = loginIdentifier.toLowerCase();

  // Search for existing user
  let matchedUser = users.find(u => 
    u.email.toLowerCase() === lowerIdent || 
    u.name.toLowerCase() === lowerIdent ||
    u.email.toLowerCase().startsWith(lowerIdent + '@')
  );

  // If user does not exist, auto-provision dynamically with their provided username/name!
  if (!matchedUser) {
    const displayName = formatDisplayName(loginIdentifier);
    const generatedEmail = loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier.toLowerCase().replace(/\s+/g, '')}@college.edu`;

    matchedUser = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email: generatedEmail,
      role: 'student',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=173b63,2f9c95,7567c7`,
      department: department || 'Electronics & Communication Engineering (ECE)',
      institution: 'Apex Institute of Technology & Sciences',
      registerNumber: `2024${Math.floor(1000 + Math.random() * 9000)}`,
      semester: '6th Semester',
      gpa: 3.85
    };

    users.push(matchedUser);
    writeUsers(users);
  } else {
    let updated = false;
    if (department && matchedUser.department !== department) {
      matchedUser.department = department;
      updated = true;
    }
    if (role && matchedUser.role !== role) {
      matchedUser.role = role;
      updated = true;
    }
    if (updated) {
      writeUsers(users);
    }
  }

  currentSessionUser = matchedUser;

  res.json({
    success: true,
    message: `Logged in successfully as ${matchedUser.name}`,
    user: matchedUser,
    token: `token_${Date.now()}`
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (currentSessionUser) {
    return res.json({ success: true, user: currentSessionUser });
  }

  // Check saved users or fallback
  const users = readUsers();
  if (users.length > 0) {
    currentSessionUser = users[users.length - 1];
    return res.json({ success: true, user: currentSessionUser });
  }

  // Default fallback user
  const defaultUser = {
    id: 'usr_default',
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
  currentSessionUser = defaultUser;
  res.json({ success: true, user: defaultUser });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  currentSessionUser = null;
  res.json({ success: true, message: 'Logged out successfully' });
});

// PUT /api/auth/profile
router.put('/profile', (req, res) => {
  if (!currentSessionUser) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const { name, email, department, institution, gpa } = req.body;
  if (name) currentSessionUser.name = name.trim();
  if (email) currentSessionUser.email = email.trim();
  if (department) currentSessionUser.department = department;
  if (institution) currentSessionUser.institution = institution;
  if (gpa !== undefined) currentSessionUser.gpa = parseFloat(gpa);

  if (name) {
    currentSessionUser.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentSessionUser.name)}&backgroundColor=173b63,2f9c95`;
  }

  const users = readUsers();
  const idx = users.findIndex(u => u.id === currentSessionUser.id);
  if (idx >= 0) {
    users[idx] = currentSessionUser;
  } else {
    users.push(currentSessionUser);
  }
  writeUsers(users);

  res.json({ success: true, user: currentSessionUser });
});

export default router;
