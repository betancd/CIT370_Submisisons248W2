(() => {
  const isAuth = getStorage('isAuth');
  if (!isAuth) {
    logout();
    alert('Log in to view your countries.');
    window.location.href = '/login.html';
  }
})();