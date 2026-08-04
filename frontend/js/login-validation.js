const loginForm = document.getElementById("loginForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");

function showError(input, message){

    const group = input.closest(".form-group");

    group.querySelector(".error-message").textContent = message;

    group.querySelector(".input-box").classList.add("error");

    group.querySelector(".input-box").classList.remove("success");

}

function showSuccess(input){

    const group = input.closest(".form-group");

    group.querySelector(".error-message").textContent = "";

    group.querySelector(".input-box").classList.add("success");

    group.querySelector(".input-box").classList.remove("error");

}

function validateLogin(){

    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(loginEmail.value.trim())){

        showError(loginEmail,"Enter a valid email");

        valid=false;

    }else{

        showSuccess(loginEmail);

    }

    if(loginPassword.value.length<8){

        showError(loginPassword,"Password must be at least 8 characters");

        valid=false;

    }else{

        showSuccess(loginPassword);

    }

    loginBtn.disabled=!valid;

}

[loginEmail,loginPassword].forEach(input=>{

    input.addEventListener("input",validateLogin);

});