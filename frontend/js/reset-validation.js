const resetForm = document.getElementById("resetForm");

const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const resetBtn = document.getElementById("resetBtn");

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

function validateReset(){

    let valid = true;

    if(newPassword.value.length < 8){

        showError(newPassword,"Password must be at least 8 characters");

        valid = false;

    }else{

        showSuccess(newPassword);

    }

    if(confirmPassword.value !== newPassword.value){

        showError(confirmPassword,"Passwords do not match");

        valid = false;

    }else{

        showSuccess(confirmPassword);

    }

    resetBtn.disabled = !valid;

}

[newPassword,confirmPassword].forEach(input=>{

    input.addEventListener("input",validateReset);

});