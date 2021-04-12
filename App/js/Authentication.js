  /**
   * Used for handling authentication logic
   */
   class Authentication {

    /**
     * Default constructor sets logged in to false and hostname
     */
    constructor() {
      this.api = new Api('http://127.0.0.1:5000/');  // default for local Flask
    }
    
    /**
     * Login authentication
     * 
     * @param {string} username used for Username login credential
     * @param {string} password used for Password login credential
     */
    async authenticate(username, password){
      return this.api.authLogin(username, password);
    }

    /**
     * Checks if localStorage was set from the successful login.
     */
    validateLogin(){
      let loggedIn = false; 
      if(localStorage.getItem("username") && localStorage.getItem("username")){
        loggedIn = true;
      }
      if(loggedIn === false){
        window.location.replace('/login');
      }
    }

    /**
     * Clears local storage and redirects to login.
     * logout() can be called and then validateLogin() immediately after to redirect or redirecting to login works the same
     */
    logout(){
      localStorage.clear();
    }
  }
  