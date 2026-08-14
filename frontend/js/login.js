const loginForm = document.getElementById("loginForm");


console.log(document.getElementById("loginEmail"));
console.log(document.getElementById("loginPassword"));
console.log(document.getElementById("loginForm"));

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/v1/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Login failed"
            );

            return;
        }

        // Save JWT Token
        localStorage.setItem(
            "token",
            data.token
        );

        // Save User Info
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        alert("Login Successful ✅");

        window.location.href =
            "dashboard.html";

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to server"
        );

    }

});