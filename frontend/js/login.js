(function () {

    "use strict";

    const LOGIN_API_URL =
        "http://localhost:5000/api/v1/auth/login";

    const loginForm =
        document.getElementById("loginForm");
              
        // Remember Me
    const rememberMeCheckbox =
        document.getElementById("rememberMe");
    
        if(rememberMeCheckbox) {
            rememberMeCheckbox.checked =
                localStorage.getItem("rememberMe") === "true";
        }

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    function notify(message, type = "info") {

        if (typeof showToast === "function") {
            showToast(message, type);
        } else {
            alert(message);
        }

    }

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const rememberMe =
            document.getElementById("rememberMe")?.checked || false;

        console.log("Remember Me:", rememberMe );  //Temporary

        if (!email || !password) {

            notify(
                "Email and password are required.",
                "error"
            );

            return;
        }

        const loginBtn =
            document.getElementById("loginBtn");

        const text =
            loginBtn?.querySelector(".btn-text");

        const spinner =
            loginBtn?.querySelector(".spinner");

        if (loginBtn) {
            loginBtn.disabled = true;
        }

        if (text) {
            text.style.display = "none";
        }

        if (spinner) {
            spinner.style.display = "inline-block";
        }

        try {

            const response = await fetch(
                LOGIN_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login Response:", data);

            if (!response.ok) {

                notify(
                    data.message || "Login failed.",
                    "error"
                );

                return;
            }

            // =========================
            // SAVE JWT TOKEN
            // =========================

            if (!data.token) {

                console.error(
                    "JWT token missing from response."
                );

                notify(
                    "Login failed: Token not received.",
                    "error"
                );

                return;
            }
              
            // save jwt token
            if(rememberMe) {

                // Checked
                localStorage.setItem(
                    "token",
                    data.token
                );

                //Remove old session
                sessionStorage.removeItem("token");
            } else {
                //Remember Me unchecked
                sessionStorage.setItem(
                    "token",
                    data.token
                );

                //Remove old persistent token
                localStorage.removeItem("token");
            }

            // =========================
            // SAVE USER
            // =========================

            if(data.user) {
                const userData = 
                JSON.stringify(data.user);

                if(rememberMe) {
                    localStorage.setItem (
                        "user",
                        userData
                    );
                    sessionStorage.removeItem("user");
                } else {
                    sessionStorage.setItem(
                        "user",
                        userData
                    );
                    localStorage.removeItem("user");
                }
            }

            // Save remember me
            localStorage.setItem(
                "rememberMe",
                rememberMe.toString()
            );

            console.log(
                "Token saved:",
                localStorage.getItem("token")
            );

            console.log(
                "User saved:",
                localStorage.getItem("user")
            );

            notify(
                "Login successful! 🎉",
                "success"
            );

            // =========================
            // REDIRECT
            // =========================

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 500);

        } catch (error) {

            console.error(
                "Login Network Error:",
                error
            );

            notify(
                "Unable to connect to server. Is the backend running?",
                "error"
            );

        } finally {

            if (loginBtn) {
                loginBtn.disabled = false;
            }

            if (text) {
                text.style.display = "inline";
            }

            if (spinner) {
                spinner.style.display = "none";
            }

        }

    });

})();