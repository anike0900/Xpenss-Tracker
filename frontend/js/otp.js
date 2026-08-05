const otpInputs = document.querySelectorAll(".otp-input");
const otpForm = document.getElementById("otpForm");
const timerEl = document.getElementById("timer");
const resendBtn = document.getElementById("resendOtp"); // FIX: was "resendBtn", HTML id is "resendOtp"

/* Auto Move + filled state (FIX: "filled" class logic now lives
   inside the input listener where `value` actually exists, instead
   of a stray top-level block that threw a ReferenceError and halted
   the rest of the script) */
otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value;

        if (value) {
            input.classList.add("filled");
            if (index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        } else {
            input.classList.remove("filled");
        }
    });
});

/* Backspace */
otpInputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

/* Paste */
otpInputs[0].addEventListener("paste", (e) => {
    e.preventDefault();
    const otp = e.clipboardData.getData("text").replace(/\D/g, "");

    otp.split("").forEach((digit, index) => {
        if (index < otpInputs.length) {
            otpInputs[index].value = digit;
            otpInputs[index].classList.add("filled");
        }
    });

    const nextIndex = Math.min(otp.length, otpInputs.length - 1);
    otpInputs[nextIndex].focus();
});

window.addEventListener("load", () => {
    otpInputs[0].focus();
});

/* Timer */
let seconds = 120;
let countdown;

function startTimer() {
    clearInterval(countdown);
    seconds = 120;
    resendBtn.classList.add("disabled"); // FIX: .disabled doesn't work on <a>, use a class instead

    countdown = setInterval(() => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        timerEl.textContent = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        seconds--;

        if (seconds < 0) {
            clearInterval(countdown);
            timerEl.innerHTML = "<span style='color:#EF4444;'>Expired</span>";
            resendBtn.classList.remove("disabled");
        }
    }, 1000);
}

startTimer();

resendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (resendBtn.classList.contains("disabled")) return;

    showToast("New OTP sent successfully", "success");
    startTimer();
});

/* FIX: verification was never actually tied to the form — this now
   validates all 6 digits are filled before showing success and
   redirecting, instead of firing unconditionally on page load. */
otpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const code = Array.from(otpInputs).map((input) => input.value).join("");

    if (code.length < otpInputs.length) {
        showToast("Please enter the complete 6-digit code", "error");
        return;
    }

    showToast("OTP Verified Successfully", "success");

    setTimeout(() => {
        window.location.href = "reset-password.html";
    }, 1200);
});