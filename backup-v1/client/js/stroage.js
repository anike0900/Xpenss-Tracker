// ================================
// XPENSS TRACKER - STORAGE MODULE
// ================================

const STORAGE_KEY = "xpenss_tracker_transactions";

// ------------------------------
// Get All Transactions
// ------------------------------

function getTransactions() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}


// ------------------------------
// Save All Transactions
// ------------------------------

function saveTransactions(transactions) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );

}


// ------------------------------
// Add New Transaction
// ------------------------------

function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.push(transaction);

    saveTransactions(transactions);

}


// ------------------------------
// Delete Transaction
// ------------------------------

function deleteTransaction(id) {

    const transactions = getTransactions();

    const updatedTransactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveTransactions(updatedTransactions);

}


// ------------------------------
// Update Transaction
// ------------------------------

function updateTransaction(updatedTransaction) {

    const transactions = getTransactions();

    const updatedList = transactions.map(transaction => {

        if (transaction.id === updatedTransaction.id) {
            return updatedTransaction;
        }

        return transaction;

    });

    saveTransactions(updatedList);

}


// ------------------------------
// Get Single Transaction
// ------------------------------

function getTransactionById(id) {

    const transactions = getTransactions();

    return transactions.find(
        transaction => transaction.id === id
    );

}


// ------------------------------
// Clear All Transactions
// ------------------------------

function clearTransactions() {

    localStorage.removeItem(STORAGE_KEY);

}