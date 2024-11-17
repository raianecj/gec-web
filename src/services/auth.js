// services/auth.js
export const setSession = (token) => {
  const expiresAt = Date.now() + 3 * 60 * 60 * 1000; // 3 horas
  localStorage.setItem('authToken', JSON.stringify({ token, expiresAt }));
};

export const isSessionValid = () => {
  const session = JSON.parse(localStorage.getItem('authToken'));
  if (!session || Date.now() > session.expiresAt) {
    localStorage.removeItem('authToken');
    return false;
  }
  return true;
};

export const clearSession = () => {
  localStorage.removeItem('authToken');
};
