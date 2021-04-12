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
    authenticate(username, password){
      console.log("authenticate....")
      let isValid = false;
      let loginAttempt = this.api.authLogin(username, password)
      loginAttempt.then(Response => {
        console.log('response: ', Response)
      })
    }

    logout(){
      localStorage.clear();
      window.location.replace('/login');
    }
  }
  