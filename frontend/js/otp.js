const otpInputs = document.querySelectorAll(".otp-input");

/* Auto Move */

otpInputs.forEach((input, index) => {

    input.addEventListener("input", (e) => {

        let value = e.target.value.replace(/\D/g, "");

        e.target.value = value;

        if(value && index < otpInputs.length-1){

            otpInputs[index+1].focus();

        }

    });

});

/* Backspace */

otpInputs.forEach((input,index)=>{

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Backspace" && input.value===""){

            if(index>0){

                otpInputs[index-1].focus();

            }

        }

    });

});

otpInputs[0].addEventListener("paste",(e)=>{

    e.preventDefault();

    const otp = e.clipboardData
                 .getData("text")
                 .replace(/\D/g,"");

    otp.split("").forEach((digit,index)=>{

        if(index<otpInputs.length){

            otpInputs[index].value=digit;

        }

    });

});

window.addEventListener("load",()=>{

    otpInputs[0].focus();

});