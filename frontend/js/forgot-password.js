document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("forgotPasswordForm");
    const emailInput = document.getElementById("email");
    const sendResetBtn = document.getElementById("sendResetBtn");

    console.log("Forgot Password JS loaded");
    console.log("Form:", form);
    console.log("Email:", emailInput);
    console.log("Button:", sendResetBtn);

    // ==============================
    // Auto-fill email from URL
    // ==============================

    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");

    if (emailFromUrl && emailInput) {
        emailInput.value = emailFromUrl;
    }


    // ==============================
    // Form Submit
    // ==============================

    if (!form) {
        console.error("forgotPasswordForm not found!");
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Forgot password form submitted");


        const email = emailInput.value.trim();

        if (!email) {

            alert("Please enter your email.");

            return;
        }


        try {

            if (sendResetBtn) {
                sendResetBtn.disabled = true;
            }


            console.log("Sending request to backend...");


            const response = await fetch(
                "http://localhost:5000/api/v1/auth/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email
                    })
                }
            );


            const data = await response.json();


            console.log("Forgot Password Response:", data);


            if (!response.ok) {

                const date = await response.json();   // add

                showToast(                   // alert
                    data.message ||
                    "Something went wrong",
                    "error"
                );

                return;
            }


            // ==============================
            // SUCCESS
            // ==============================

            alert(
                "Password reset link generated successfully!"
            );


            console.log(
                "RESET URL:",
                data.resetUrl
            );


            // Development purpose
            if (data.resetUrl) {

                window.location.href = data.resetUrl;

            }


        } catch (error) {

            console.error(
                "Forgot Password Network Error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        } finally {

            if (sendResetBtn) {
                sendResetBtn.disabled = false;
            }

        }

    });

});