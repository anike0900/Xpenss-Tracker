// =======================================
// XPENSS TRACKER - CHART.JS
// =======================================

let expenseChart = null;

// ---------------------------------------
// Update Chart
// ---------------------------------------

function updateChart(transactions) {

    const categoryTotals = {};

    // Calculate expense category totals

    transactions.forEach(transaction => {

        if (transaction.type === "expense") {

            if (!categoryTotals[transaction.category]) {

                categoryTotals[transaction.category] = 0;

            }

            categoryTotals[transaction.category] += transaction.amount;

        }

    });

    const labels = Object.keys(categoryTotals);

    const values = Object.values(categoryTotals);

    const ctx = document
        .getElementById("expenseChart")
        .getContext("2d");

    // Destroy previous chart

    if (expenseChart) {

        expenseChart.destroy();

    }

    expenseChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Expenses",

                    data: values,

                    backgroundColor: [

                        "#3B82F6",
                        "#EF4444",
                        "#10B981",
                        "#F59E0B",
                        "#8B5CF6",
                        "#06B6D4",
                        "#EC4899",
                        "#84CC16"

                    ],

                    borderColor: "#ffffff",

                    borderWidth: 2,

                    hoverOffset: 15

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#ffffff",

                        padding: 20,

                        font: {

                            size: 14

                        }

                    }

                },

                title: {

                    display: true,

                    text: "Expense Distribution",

                    color: "#ffffff",

                    font: {

                        size: 18,

                        weight: "bold"

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return `${context.label} : ₹${context.raw}`;

                        }

                    }

                }

            },

            animation: {

                animateRotate: true,

                animateScale: true

            }

        }

    });

}