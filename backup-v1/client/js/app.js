// =======================================
// XPENSS TRACKER - APP.JS
// Core Application Logic
// =======================================

// ---------- DOM Elements ----------

const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");

// ----------------------------------
// Load Data
// ----------------------------------

let transactions = getTransactions();

// ----------------------------------
// Generate Unique ID
// ----------------------------------

function generateId() {
    return Date.now();
}

// ----------------------------------
// Render Everything
// ----------------------------------

function renderApp() {

    renderTransactions();

    updateSummary();

    if (typeof updateChart === "function") {
        updateChart(transactions);
    }

}

// ----------------------------------
// Add Transaction
// ----------------------------------

expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const type = typeInput.value;

    if (
        title === "" ||
        amount <= 0 ||
        category === "" ||
        date === "" ||
        type === ""
    ) {
        alert("Please fill all fields correctly.");
        return;
    }

    const transaction = {

        id: generateId(),

        title,

        amount,

        category,

        date,

        type

    };

    addTransaction(transaction);

    transactions = getTransactions();

    renderApp();

    expenseForm.reset();

});

// ----------------------------------
// Render Transaction List
// ----------------------------------

function renderTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML =
            "<li>No Transactions Found.</li>";

        return;

    }

    transactions
        .slice()
        .reverse()
        .forEach(transaction => {

            const li = document.createElement("li");

            li.innerHTML = `

                <div class="transaction-info">

                    <span class="transaction-title">
                        ${transaction.title}
                    </span>

                    <span class="transaction-date">
                        ${transaction.category} • ${transaction.date}
                    </span>

                </div>

                <div>

                    <span class="transaction-amount ${transaction.type}">
                        ${transaction.type === "income" ? "+" : "-"}
                        ₹${transaction.amount}
                    </span>

                    <button
                        class="delete-btn"
                        onclick="removeTransaction(${transaction.id})">

                        Delete

                    </button>

                </div>

            `;

            transactionList.appendChild(li);

        });

}

// ----------------------------------
// Delete Transaction
// ----------------------------------

function removeTransaction(id) {

    if (!confirm("Delete this transaction?")) {

        return;

    }

    deleteTransaction(id);

    transactions = getTransactions();

    renderApp();

}

// ----------------------------------
// Calculate Balance
// ----------------------------------

function updateSummary() {

    let income = 0;

    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });

    const balance = income - expense;

    balanceElement.textContent = `₹${balance.toFixed(2)}`;

    incomeElement.textContent = `₹${income.toFixed(2)}`;

    expenseElement.textContent = `₹${expense.toFixed(2)}`;

}

// ----------------------------------
// Initialize
// ----------------------------------

renderApp();