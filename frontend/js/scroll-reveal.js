const revealElements = document.querySelectorAll(
".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

observer.unobserve(entry.target);

}

});

},

{

threshold:.15

}

);

revealElements.forEach(el=>{

observer.observe(el);

});