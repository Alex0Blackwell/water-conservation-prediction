let auth = new Authentication();

//logs out and validates login to redirect
function logout(){
    auth.logout();
    auth.validateLogin();
}

function onStart(){
    auth.validateLogin();
}

onStart();