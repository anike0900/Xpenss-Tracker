resetForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    validateReset();

    if(resetBtn.disabled){

        showToast("Please fix the errors","error");

        return;

    }

    const text = document.querySelector(".btn-text");
    const spinner = document.querySelector(".spinner");

    resetBtn.disabled = true;

    text.style.display = "none";
    spinner.style.display = "block";

    setTimeout(()=>{

        spinner.style.display = "none";
        text.style.display = "inline";

        document.querySelector(".auth-card")
        .classList.add("success-animation");

        showToast("Password Updated Successfully 🎉","success");

        setTimeout(()=>{

            window.location.href = "login.html";

        },1500);

    },2000);

});