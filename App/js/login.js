let auth = new Authentication();

function loginSubmit(){
    console.log("loginSubmit")
    let submissionform = document.getElementById('submissionform');
    let valid = auth.authenticate(submissionform.username.value, submissionform.password.value);
    if(valid){
        localStorage.setItem("username", submissionform.username.value);
        //redirect to admin page here
    } else {
        let incorrectPrompt = document.getElementById("incorrect-submit")
        incorrectPrompt.style.display = "block";
    }
}

function redirectDefaultPage(){
    window.location.replace('/');
}