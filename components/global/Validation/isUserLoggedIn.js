// Check if User is Logged In and if user is Real
const isUserLoggedIn = (pointer, callback) => {
  pointer.innerHTML = loaderElement;

  const checkIfUserIsAuthenticated = new Promise((resolve, reject) => {
    axios.get("/users/login-status").then(res => {
      loginStatus = res.data;
    });
    resolve();
  });

  checkIfUserIsAuthenticated.then(() => {
    pointer.innerHTML = "";
    callback();
  });
};
