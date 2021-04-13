let auth = new Authentication();

/**
 * logs out and validates login to redirect.
 */
function logout(){
    auth.logout();
    auth.validateLogin();
}

/**
 * loaded on start of the admin page.
 * We must determine if the user may access this page.
 */
function onStart(){
    auth.validateLogin();
}

onStart();
