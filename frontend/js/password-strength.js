const passwordInput =
document.getElementById("password") ||
document.getElementById("newPassword");

const strengthFill =
document.querySelector(".strength-fill");

const strengthText =
document.getElementById("strengthText");

const rules = {

length:document.getElementById("rule-length"),

upper:document.getElementById("rule-upper"),

lower:document.getElementById("rule-lower"),

number:document.getElementById("rule-number"),

special:document.getElementById("rule-special")

};

passwordInput.addEventListener("input",()=>{

const password=passwordInput.value;

let score=0;

const checks={

length:password.length>=8,

upper:/[A-Z]/.test(password),

lower:/[a-z]/.test(password),

number:/[0-9]/.test(password),

special:/[^A-Za-z0-9]/.test(password)

};

Object.keys(checks).forEach(key=>{

if(checks[key]){

score++;

rules[key].classList.add("valid");

rules[key].innerHTML="✔ "+rules[key].textContent.substring(2);

}else{

rules[key].classList.remove("valid");

rules[key].innerHTML="✖ "+rules[key].textContent.substring(2);

}

});

const percent=(score/5)*100;

strengthFill.style.width=percent+"%";

if(score<=2){

strengthFill.style.background="#EF4444";

strengthText.textContent="Weak";

}

else if(score===3){

strengthFill.style.background="#F59E0B";

strengthText.textContent="Medium";

}

else if(score===4){

strengthFill.style.background="#3B82F6";

strengthText.textContent="Strong";

}

else{

strengthFill.style.background="#22C55E";

strengthText.textContent="Very Strong";

}

});