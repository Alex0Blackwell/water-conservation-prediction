let auth = new Authentication();

function loginSubmit(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('pass').value;
    auth.authenticate(username, password).then(function(response){
        let incorrectPrompt = document.getElementById("incorrect-submit")
        console.log(response);
        if(response){
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            incorrectPrompt.style.display = "none"; 
            window.location.replace('/admin');
        } else {
            incorrectPrompt.style.display = "block"; 
        }
    });
}

function redirectDefaultPage(){
    window.location.replace('/');
}

auth.logout();