const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
document.getElementById("confirmPassword");

const registerBtn =
document.getElementById("registerBtn");

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

function validateForm(){

let valid = true;

/* Name */

if(nameInput.value.trim().length < 3){

showError(nameInput,"Minimum 3 characters");

valid=false;

}else{

showSuccess(nameInput);

}

/* Email */

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(emailInput.value)){

showError(emailInput,"Invalid email");

valid=false;

}else{

showSuccess(emailInput);

}

/* Phone */

const phoneRegex=/^[6-9]\d{9}$/;

if(!phoneRegex.test(phoneInput.value)){

showError(phoneInput,"Invalid phone number");

valid=false;

}else{

showSuccess(phoneInput);

}

/* Password Match */

if(passwordInput.value!==confirmPasswordInput.value){

showError(confirmPasswordInput,
"Passwords do not match");

valid=false;

}else{

showSuccess(confirmPasswordInput);

}

registerBtn.disabled=!valid;

}
[
    nameInput,
    emailInput,
    phoneInput,
    passwordInput,
    confirmPasswordInput
].forEach(input=>{
    input.addEventListener("input",validateForm);
});

form.addEventListener("submit",(e)=>{

e.preventDefault();

validateForm();

if(registerBtn.disabled){

return;

}

/* Backend API yaha connect hogi */

console.log("Form Submitted");

});