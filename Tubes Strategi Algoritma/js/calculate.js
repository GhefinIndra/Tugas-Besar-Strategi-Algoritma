// Define arrays to store item details
var items = [];
var weights = [];
var profits = [];
var knapsackCapacity;

// Function to add item
function addItem(event) {
    event.preventDefault();
    var itemName = document.getElementById("barang").value;
    var weight = document.getElementById("beratBarang").value;
    var profit = document.getElementById("profitBarang").value;

    if (itemName && weight && profit) {
        items.push(itemName);
        weights.push(parseInt(weight));
        profits.push(parseInt(profit));

        document.getElementById("itemsAdded").textContent = items.join(", ");
        console.log("Item added: " + itemName);
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to calculate using greedy approach
function greedy() {
    var n = profits.length;
    var selectedItems = [];
    var totalWeight = 0;
    var totalProfit = 0;

    // Calculate profit-to-weight ratio for each item
    var ratios = [];
    for (var i = 0; i < n; i++) {
        ratios.push({
            index: i,
            ratio: profits[i] / weights[i]
        });
    }

    // Sort items based on profit-to-weight ratio in non-increasing order
    ratios.sort(function(a, b) {
        return b.ratio - a.ratio;
    });

    // Greedy selection of items
    for (var i = 0; i < n; i++) {
        var index = ratios[i].index;
        if (totalWeight + weights[index] <= knapsackCapacity) {
            selectedItems.push(items[index]);
            totalWeight += weights[index];
            totalProfit += profits[index];
        }
    }

    // Display results
    document.getElementById("greedyResult").innerHTML = "Selected items: " + selectedItems.join(", ");
    document.getElementById("greedyResult").innerHTML += "<br>Total weight: " + totalWeight;
    document.getElementById("greedyResult").innerHTML += "<br>Total profit: " + totalProfit;
}

// Function to calculate using dynamic programming approach
function dynamicProgramming() {
    var n = profits.length;
    var selectedItems = [];
    var totalWeight = 0;
    var totalProfit = 0;

    // Initialize 2D array to store maximum profit
    var dp = [];
    for (var i = 0; i <= n; i++) {
        dp[i] = [];
        for (var w = 0; w <= knapsackCapacity; w++) {
            if (i === 0 || w === 0) {
                dp[i][w] = 0;
            } else if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(profits[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Trace back to find selected items
    var i = n;
    var w = knapsackCapacity;
    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            totalWeight += weights[i - 1];
            totalProfit += profits[i - 1];
            w -= weights[i - 1];
        }
        i--;
    }

    // Display results
    document.getElementById("dpResult").innerHTML = "Selected items: " + selectedItems.join(", ");
    document.getElementById("dpResult").innerHTML += "<br>Total weight: " + totalWeight;
    document.getElementById("dpResult").innerHTML += "<br>Total profit: " + totalProfit;
}

// Function to calculate
function calculate(event) {
    event.preventDefault();
    // Get knapsack capacity
    knapsackCapacity = parseInt(document.getElementById("kapasitasBarang").value);

    // Perform calculations using both approaches
    greedy();
    dynamicProgramming();
}
