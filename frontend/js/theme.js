const toggle=document.getElementById("themeToggle");

const body=document.body;

const saved=localStorage.getItem("theme");

if(saved==="light"){

body.classList.add("light");

toggle.innerHTML="☀️";

}

toggle.addEventListener("click",()=>{

body.classList.toggle("light");

const isLight=body.classList.contains("light");

toggle.innerHTML=isLight?"☀️":"🌙";

localStorage.setItem(

"theme",

isLight?"light":"dark"

);

});