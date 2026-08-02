document.addEventListener("DOMContentLoaded", () => {
    console.log("Navbar Loaded Successfully");
});

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.toggle("active");

});