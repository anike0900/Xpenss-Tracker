const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const wrapper = button.closest(".password-wrapper");

        const input = wrapper.querySelector("input");

        const icon = button.querySelector(".eye-icon");

        if (input.type === "password") {

            input.type = "text";

            icon.textContent = "🙈";

            button.setAttribute("aria-label", "Hide password");

        } else {

            input.type = "password";

            icon.textContent = "👁️";

            button.setAttribute("aria-label", "Show password");

        }

    });

});