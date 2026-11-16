// Toggle Dark Mode
function toggleDarkMode(btn) {
    document.body.classList.toggle("dark-mode");
    btn.innerText = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
}

// Product list
var products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", icon: "🎧", price: 199 },
    { id: 2, name: "Mechanical Keyboard", category: "Electronics", icon: "⌨️", price: 89 },
    { id: 3, name: "Gaming Console", category: "Gaming", icon: "🎮", price: 499 },
    { id: 4, name: "Gaming Controller", category: "Gaming", icon: "🕹️", price: 129 },
    { id: 5, name: "DSLR Camera", category: "Cameras", icon: "📸", price: 799 },
    { id: 6, name: "Camera Tripod", category: "Cameras", icon: "📷", price: 59 },
    { id: 7, name: "Scientific Calculator", category: "Study", icon: "🧮", price: 29 },
    { id: 8, name: "Desk Study Lamp", category: "Study", icon: "💡", price: 39 }
];

var selectedDays = {};

// Render products into their category sections
function showProducts(items) {
    var grids = document.getElementsByClassName("product-grid");
    for (var g = 0; g < grids.length; g++) {
        grids[g].innerHTML = "";
    }

    document.getElementById("noResults").style.display = items.length === 0 ? "block" : "none";

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var days = selectedDays[item.id] || 1;

        var card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-icon">${item.icon}</div>
            <div class="card-details">
                <h4>${item.name}</h4>
                <p class="price">₹${item.price} / day</p>
            </div>
            <div class="card-actions">
                <div class="days-box-group" id="days-group-${item.id}">
                    <button class="day-box ${days === 1 ? 'selected' : ''}" onclick="selectDays(${item.id}, 1)">1 Day</button>
                    <button class="day-box ${days === 3 ? 'selected' : ''}" onclick="selectDays(${item.id}, 3)">3 Days</button>
                    <button class="day-box ${days === 7 ? 'selected' : ''}" onclick="selectDays(${item.id}, 7)">7 Days</button>
                </div>
                <button class="rent-btn" onclick="rentNow(${item.id})">Rent Now</button>
            </div>
        `;

        document.getElementById(item.category.toLowerCase() + "Grid").appendChild(card);
    }

    // Hide empty category headings during search
    var categories = ["electronics", "gaming", "cameras", "study"];
    for (var c = 0; c < categories.length; c++) {
        var hasItems = document.getElementById(categories[c] + "Grid").children.length > 0;
        document.getElementById(categories[c]).style.display = hasItems ? "block" : "none";
    }
}

// Handle clicking on a duration box
function selectDays(productId, days) {
    selectedDays[productId] = days;

    var buttons = document.getElementById("days-group-" + productId).getElementsByClassName("day-box");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("selected", buttons[i].innerText.startsWith(days));
    }
}

// Direct Rent button click
function rentNow(productId) {
    var days = selectedDays[productId] || 1;

    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            var total = products[i].price * days;
            alert("Rented successfully!\n\nItem: " + products[i].name + "\nDuration: " + days + " day(s)\nTotal Amount: ₹" + total);
            break;
        }
    }
}

// Search functionality
document.getElementById("searchBtn").onclick = function () {
    var query = document.getElementById("searchInput").value.toLowerCase();
    var filtered = [];

    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(query)) {
            filtered.push(products[i]);
        }
    }
    showProducts(filtered);
};

// Initial load
showProducts(products);