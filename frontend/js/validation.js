const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const registerBtn = document.getElementById("registerBtn");

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

if (
    passwordInput.value !==
    confirmPasswordInput.value
) {

    showError(
        confirmPasswordInput,
        "Passwords do not match"
    );

    valid = false;

} else {

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

/* form submit */
/* form submit */
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    validateForm();

    if (registerBtn.disabled) {

        showToast(
            "Please fix validation errors",
            "error"
        );

        return;
    }

    registerBtn.disabled = true;

    const text = document.querySelector(".btn-text");
    const spinner = document.querySelector(".spinner");

    text.style.display = "none";
    spinner.style.display = "block";


    try {

        const response = await fetch(
            "http://localhost:5000/api/v1/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    fullName: nameInput.value.trim(),

                    email: emailInput.value.trim(),

                    password: passwordInput.value

                })
            }
        );


        const data = await response.json();

        console.log("Register Response:", data);


        if (!response.ok) {

            showToast(
                data.message || "Registration failed",
                "error"
            );

            return;
        }


        // Registration successful

        showToast(
            "Registration Successful 🎉",
            "success"
        );


        setTimeout(() => {

            window.location.href = "login.html";

        }, 1200);


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        showToast(
            "Unable to connect to server",
            "error"
        );


    } finally {

        spinner.style.display = "none";

        text.style.display = "inline";

        registerBtn.disabled = false;

    }

});
/* Fake API */

// setTimeout(()=>{

// spinner.style.display="none";

// text.style.display="inline";

// showToast(

// "Registration Successful 🎉",

// "success"

// );

// registerBtn.disabled=false;

// /* Backend connect hone ke baad

// window.location.href="login.html";

// */

// },2000);

