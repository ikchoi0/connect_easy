export const logout = () => {
  localStorage.clear();
  window.location.pathname = '/login';
};

export const handleAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return logout();
  } else {
    return user;
  }
};
