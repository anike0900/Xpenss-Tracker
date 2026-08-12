// ==========================================================
// XPENSS TRACKER
// RESET PASSWORD
// Step 4.10.5.5
// ==========================================================

(function () {

    "use strict";


    // ======================================================
    // API
    // ======================================================

    const API_BASE_URL =
        "http://localhost:5000/api/v1";


    // ======================================================
    // DOM
    // ======================================================

    const form =
        document.getElementById("resetPasswordForm");

    const newPassword =
        document.getElementById("newPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const resetBtn =
        document.getElementById("resetPasswordBtn");

    const passwordError =
        document.getElementById("passwordError");

    const confirmPasswordError =
        document.getElementById("confirmPasswordError");


    // ======================================================
    // GET TOKEN FROM URL
    // ======================================================

    const urlParams =
        new URLSearchParams(window.location.search);

    const token =
        urlParams.get("token");


    // ======================================================
    // TOKEN CHECK
    // ======================================================

    if (!token) {

        alert(
            "Invalid or missing password reset link."
        );

        resetBtn.disabled = true;

    }


    // ======================================================
    // PASSWORD VALIDATION
    // ======================================================

    function validatePassword(password) {

        return password.length >= 8;

    }


    // ======================================================
    // CONFIRM PASSWORD
    // ======================================================

    function validateConfirmPassword() {

        if (
            confirmPassword.value !==
            newPassword.value
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            return false;

        }

        confirmPasswordError.textContent = "";

        return true;

    }


    // ======================================================
    // LIVE PASSWORD VALIDATION
    // ======================================================

    newPassword.addEventListener(
        "input",
        () => {

            if (
                !validatePassword(
                    newPassword.value
                )
            ) {

                passwordError.textContent =
                    "Password must be at least 8 characters.";

            } else {

                passwordError.textContent = "";

            }

        }
    );


    confirmPassword.addEventListener(
        "input",
        validateConfirmPassword
    );


    // ======================================================
    // PASSWORD TOGGLE
    // ======================================================

    document
        .getElementById("toggleNewPassword")
        ?.addEventListener(
            "click",
            () => {

                newPassword.type =
                    newPassword.type === "password"
                        ? "text"
                        : "password";

            }
        );


    document
        .getElementById("toggleConfirmPassword")
        ?.addEventListener(
            "click",
            () => {

                confirmPassword.type =
                    confirmPassword.type === "password"
                        ? "text"
                        : "password";

            }
        );


    // ======================================================
    // FORM SUBMIT
    // ======================================================

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ------------------------------------------
            // Validate token
            // ------------------------------------------

            if (!token) {

                alert(
                    "Invalid reset password link."
                );

                return;

            }


            // ------------------------------------------
            // Validate password
            // ------------------------------------------

            if (
                !validatePassword(
                    newPassword.value
                )
            ) {

                passwordError.textContent =
                    "Password must be at least 8 characters.";

                return;

            }


            // ------------------------------------------
            // Confirm password
            // ------------------------------------------

            if (
                !validateConfirmPassword()
            ) {

                return;

            }


            // ------------------------------------------
            // Loading
            // ------------------------------------------

            resetBtn.disabled = true;

            const text =
                resetBtn.querySelector(".btn-text");

            const spinner =
                resetBtn.querySelector(".spinner");

            if (text) {
                text.style.display = "none";
            }

            if (spinner) {
                spinner.style.display = "inline";
            }


            // ------------------------------------------
            // API
            // ------------------------------------------

            try {

                const response =
                    await fetch(
                        `${API_BASE_URL}/auth/reset-password/${encodeURIComponent(token)}`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                password:
                                    newPassword.value
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Reset Password Response:",
                    data
                );


                // --------------------------------------
                // API ERROR
                // --------------------------------------

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Unable to reset password."
                    );

                    resetBtn.disabled = false;

                    if (text) {
                        text.style.display = "inline";
                    }

                    if (spinner) {
                        spinner.style.display = "none";
                    }

                    return;

                }


                // --------------------------------------
                // SUCCESS
                // --------------------------------------

                alert(
                    "Password reset successful! 🎉"
                );


                // --------------------------------------
                // Redirect Login
                // --------------------------------------

                window.location.href =
                    "login.html";


            } catch (error) {

                console.error(
                    "Reset Password Network Error:",
                    error
                );

                alert(
                    "Unable to connect to server."
                );

                resetBtn.disabled = false;

                if (text) {
                    text.style.display = "inline";
                }

                if (spinner) {
                    spinner.style.display = "none";
                }

            }

        }
    );

})();