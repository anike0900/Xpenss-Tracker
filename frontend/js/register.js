const registerForm = document.getElementById("registrationForm");

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Confirm Password Check
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    try {

        // =========================
        // ACTUAL REGISTER API
        // =========================

        const response = await fetch(
            "http://localhost:5000/api/v1/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        // =========================
        // API ERROR
        // =========================

        if (!response.ok) {

            console.error("Registration Error:", data);

            alert(data.message || "Registration failed.");

            return;
        }


        // =========================
        // SUCCESS
        // =========================

        console.log("Registration Success:", data);

        alert("Registration successful!");


        // Redirect to Login
        window.location.href = "login.html";


    } catch (error) {

        console.error("Network Error:", error);

        alert(
            "Unable to connect to server. Please try again."
        );

    }

});