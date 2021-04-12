let auth = new Authentication();

function loginSubmit(){
    let submissionform = document.getElementById('submissionform');
    auth.authenticate(submissionform.username.value, submissionform.password.value).then(function(response){
        let incorrectPrompt = document.getElementById("incorrect-submit")
        console.log(response);
        if(response){
            localStorage.setItem("username", submissionform.username.value);
            localStorage.setItem("password", submissionform.password.value);
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