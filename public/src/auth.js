const doLogin = async (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById('formInputUsername');
  const passwordInput = document.getElementById('formInputPassword');

  if (!usernameInput || !passwordInput) {
      console.error('Username or password input not found');
      return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
      const res = await login({ username, password });
      if (!res) throw new Error('Failed to login. Please try again later.');

      const { auth, access_token, refresh_token } = res;

      setStorage('isAuth', auth);
      setStorage('access_token', access_token);
      setStorage('refresh_token', refresh_token);

      window.location.href = 'home.html';
  } catch (err) {
      alert(err.message);
  }
};
