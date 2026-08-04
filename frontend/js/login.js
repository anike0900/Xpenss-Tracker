loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    validateLogin();

    if(loginBtn.disabled){

        showToast("Please fix the errors","error");

        return;

    }

    const text=document.querySelector(".btn-text");
    const spinner=document.querySelector(".spinner");

    loginBtn.disabled=true;

    text.style.display="none";
    spinner.style.display="block";

    setTimeout(()=>{

        spinner.style.display="none";
        text.style.display="inline";

        showToast("Login Successful 🎉","success");

        loginBtn.disabled=false;

        // dashboard.html

    },2000);

});