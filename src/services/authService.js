// Key names for localStorage
const USERS_KEY = 'users';
const CURRENT_KEY = 'currentUser';

// Get users array from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
// Set users array in localStorage
function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Change listeners (for context)
const listeners = [];
function notifyAuthChanged() {
  for (const cb of listeners) cb(getCurrentUser());
}
// Subscribe to auth state changes
export function subscribeAuth(cb) {
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i > -1) listeners.splice(i, 1);
  };
}

// Register a new user. Throws if email already exists.
export function register(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) throw new Error('Email already registered');
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  setUsers(users);
  localStorage.setItem(CURRENT_KEY, newUser.id);
  notifyAuthChanged();
  return newUser;
}

// Login user with email and password. Throws if invalid.
export function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  localStorage.setItem(CURRENT_KEY, user.id);
  notifyAuthChanged();
  return user;
}

// Get the currently logged-in user object.
export function getCurrentUser() {
  const id = localStorage.getItem(CURRENT_KEY);
  if (!id) return null;
  return getUsers().find(u => u.id === Number(id));
}

// Update user's name/email by ID. Throws if new email is used by other user.
export function updateUser(id, name, email) {
  const users = getUsers();
  const ident = Number(id);
  // Prevent changing to email used by another account
  if (users.some(u => u.email === email && u.id !== ident))
    throw new Error('Email already registered');
  const user = users.find(u => u.id === ident);
  if (!user) throw new Error('User not found');
  user.name = name;
  user.email = email;
  setUsers(users);
  // Ensure currentUser stays correct
  if (localStorage.getItem(CURRENT_KEY) == ident) {
    localStorage.setItem(CURRENT_KEY, ident);
  }
  notifyAuthChanged();
  return user;
}

// Logout user (removes current user id)
export function logout() {
  localStorage.removeItem(CURRENT_KEY);
  notifyAuthChanged();
}