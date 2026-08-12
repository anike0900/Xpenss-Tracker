// ==========================================================
// XPENSS TRACKER
// Dashboard JavaScript
// Step 4.10.3.2
// ==========================================================

(function () {

    "use strict";


    // ======================================================
    // API CONFIG
    // ======================================================
    const API_BASE_URL =
        (typeof window.API_BASE_URL !== "undefined")
            ? window.API_BASE_URL
            : "http://localhost:5000/api";


    // ======================================================
    // DOM ELEMENTS
    // ======================================================

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const welcomeName = document.getElementById("welcomeName");
    const userInitial = document.getElementById("userInitial");

    const logoutBtn = document.getElementById("logoutBtn");

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");


    // ======================================================
    // TOAST / NOTIFICATION
    // ======================================================

    function notify(message, type = "info") {

        if (typeof showToast === "function") {

            showToast(message, type);

        } else {

            console.log(`[${type}] ${message}`);

        }

    }


    // ======================================================
    // GET TOKEN
    // ======================================================

    function getToken() {

        return (
            localStorage.getItem("token") ||
            sessionStorage.getItem("token")
        );
    }


    // ======================================================
    // CHECK LOGIN
    // ======================================================

    function checkAuthentication() {

        const token = getToken();

        if (!token) {

            console.log("No JWT token found.");

            window.location.href = "login.html";

            return false;

        }

        return true;

    }


    // ======================================================
    // GET CURRENT USER
    // ======================================================

    async function getCurrentUser() {

        const token = getToken();
        console.log("Dashboard Token:", token);
        console.log(
            "ME API:" ,
             `${API_BASE_URL}/v1/auth/me`
        );

        if (!token) {

            window.location.href = "login.html";

            return;

        }


        try {

           const response = await fetch(
    "http://localhost:5000/api/v1/auth/me",
    {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    }
);


            const data = await response.json();


            // ==============================================
            // TOKEN INVALID / EXPIRED
            // ==============================================

            if (response.status === 401) {

                console.warn("JWT expired or invalid.");

                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("rememberMe");

                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");

                notify(
                    "Session expired. Please login again.",
                    "error"
                );

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 800);

                return;

            }


            // ==============================================
            // OTHER ERROR
            // ==============================================

            if (!response.ok) {

                console.error(
                    "Get Current User Error:",
                    data
                );

                notify(
                    data.message || "Unable to load user.",
                    "error"
                );

                return;

            }


            // ==============================================
            // SUCCESS
            // ==============================================

            console.log(
                "Current User:",
                data
            );


            const user = data.user;


            if (!user) {

                console.error(
                    "User data missing from API response."
                );

                return;

            }


            updateUserUI(user);


        } catch (error) {

            console.error(
                "Dashboard Network Error:",
                error
            );

            notify(
                "Unable to connect to server.",
                "error"
            );

        }

    }


    // ======================================================
    // UPDATE USER UI
    // ======================================================

    function updateUserUI(user) {

        const fullName =
            user.fullName || "User";

        const email =
            user.email || "";


        // Header Name

        if (userName) {

            userName.textContent = fullName;

        }


        // Header Email

        if (userEmail) {

            userEmail.textContent = email;

        }


        // Welcome Message

        if (welcomeName) {

            welcomeName.textContent =
                getFirstName(fullName);

        }


        // Avatar Initial

        if (userInitial) {

            userInitial.textContent =
                getInitial(fullName);

        }

    }


    // ======================================================
    // GET FIRST NAME
    // ======================================================

    function getFirstName(fullName) {

        return fullName
            .trim()
            .split(" ")[0];

    }


    // ======================================================
    // GET INITIAL
    // ======================================================

    function getInitial(fullName) {

        return fullName
            .trim()
            .charAt(0)
            .toUpperCase();

    }


    // ======================================================
    // LOGOUT
    // ======================================================

    async function logoutUser() {

        const token = getToken();


        try {

            // ==============================================
            // Call Backend Logout API
            // ==============================================

            if (token) {

                await fetch(
                    `${API_BASE_URL}/v1/auth/logout`,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`

                        },

                        credentials: "include"

                    }
                );

            }


        } catch (error) {

            console.error(
                "Logout API Error:",
                error
            );


        } finally {

           //  CLEAR LOCAL STORAGE
           localStorage.removeItem("token");
           localStorage.removeItem("user");
         //    localStorage.removeItem("rememberMe");

            // CLEAR SESSION STORAGE

           sessionStorage.removeItem("token");
           sessionStorage.removeItem("user");

            // SUCCESS MESSAGE
            notify(
          "Logged out successfully.",
          "success"
         );

          // REDIRECT
          setTimeout(() => {
            window.location.href =
             "login.html";
              }, 500);

        }

    }


    // ======================================================
    // SIDEBAR MOBILE
    // ======================================================

    function setupMobileMenu() {

        if (!menuBtn || !sidebar) {

            return;

        }


        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("open");

            }
        );

    }


    // ======================================================
    // SIDEBAR NAVIGATION
    // ======================================================

    function setupNavigation() {

        const navItems =
            document.querySelectorAll(".nav-item");


        navItems.forEach(item => {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    navItems.forEach(nav => {

                        nav.classList.remove(
                            "active"
                        );

                    });


                    this.classList.add("active");


                    const page =
                        this.dataset.page;


                    console.log(
                        "Selected page:",
                        page
                    );

                }
            );

        });

    }


    // ======================================================
    // ADD EXPENSE BUTTONS
    // ======================================================

    function setupExpenseButtons() {

        const addExpenseBtn =
            document.getElementById(
                "addExpenseBtn"
            );


        const emptyAddExpenseBtn =
            document.getElementById(
                "emptyAddExpenseBtn"
            );


        const quickExpenseBtn =
            document.getElementById(
                "quickExpenseBtn"
            );


        const buttons = [

            addExpenseBtn,

            emptyAddExpenseBtn,

            quickExpenseBtn

        ];


        buttons.forEach(button => {

            if (!button) {

                return;

            }


            button.addEventListener(
                "click",
                () => {

                    notify(
                        "Expense module coming next.",
                        "info"
                    );

                }
            );

        });

    }


    // ======================================================
    // QUICK ACTIONS
    // ======================================================

    function setupQuickActions() {

        const incomeBtn =
            document.getElementById(
                "quickIncomeBtn"
            );


        const budgetBtn =
            document.getElementById(
                "quickBudgetBtn"
            );


        const analyticsBtn =
            document.getElementById(
                "quickAnalyticsBtn"
            );


        incomeBtn?.addEventListener(
            "click",
            () => {

                notify(
                    "Income module coming next.",
                    "info"
                );

            }
        );


        budgetBtn?.addEventListener(
            "click",
            () => {

                notify(
                    "Budget module coming soon.",
                    "info"
                );

            }
        );


        analyticsBtn?.addEventListener(
            "click",
            () => {

                notify(
                    "Analytics module coming soon.",
                    "info"
                );

            }
        );

    }


    // ======================================================
    // LOGOUT EVENT
    // ======================================================

    function setupLogout() {

        if (!logoutBtn) {

            return;

        }


        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }


    // ======================================================
    // INITIALIZE DASHBOARD
    // ======================================================

    async function initDashboard() {

        console.log(
            "Initializing Xpenss Dashboard..."
        );


        // ----------------------------------------------
        // 1. Check JWT
        // ----------------------------------------------

        const authenticated =
            checkAuthentication();


        if (!authenticated) {

            return;

        }


        // ----------------------------------------------
        // 2. Load Current User
        // ----------------------------------------------

        await getCurrentUser();


        // ----------------------------------------------
        // 3. Setup UI
        // ----------------------------------------------

        setupMobileMenu();

        setupNavigation();

        setupExpenseButtons();

        setupQuickActions();

        setupLogout();


        console.log(
            "Dashboard initialized successfully."
        );

    }


    // ======================================================
    // START
    // ======================================================

    document.addEventListener(
        "DOMContentLoaded",
        initDashboard
    );


})();