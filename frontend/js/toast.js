const toast=document.getElementById("toast");
const toastMessage=document.getElementById("toastMessage");

function showToast(message,type="success") {
    toastMessage.textContent=message;
    toast.className="toast show "+type;
    setTimeout(()=>{
        toast.classList.remove("show");
        },3000);
}