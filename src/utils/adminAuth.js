const ADMIN_SESSION_KEY = "pastelnest-admin-session";

export function getAdminSession() {
  const saved = localStorage.getItem(ADMIN_SESSION_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function loginAdmin({ email, password }) {
  if (email.toLowerCase() !== "admin@pastelnest.in" || password !== "admin123") {
    return null;
  }
  const session = { email, name: "PastelNest Admin", loggedInAt: new Date().toISOString() };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
