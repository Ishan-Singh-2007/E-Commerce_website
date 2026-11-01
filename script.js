// Realistic starter product list
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

var cart = [];
var currentCategory = "All";

// Render products to page
function showProducts(items) {
    var grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var card = document.createElement("div");
        card.className = "card";

        card.innerHTML = 
            '<div class="card-icon">' + item.icon + '</div>' +
            '<span class="category-tag">' + item.category + '</span>' +
            '<h4>' + item.name + '</h4>' +
            '<p class="price">₹' + item.price + ' / day</p>' +
            '<select id="days-' + item.id + '" class="duration-select">' +
                '<option value="1">1 Day</option>' +
                '<option value="3">3 Days</option>' +
                '<option value="7">7 Days</option>' +
            '</select>' +
            '<button class="add-btn" onclick="addToCart(' + item.id + ')">Add to Cart</button>';

        grid.appendChild(card);
    }
}

// Add item to cart
function addToCart(productId) {
    var selectElement = document.getElementById("days-" + productId);
    var days = parseInt(selectElement.value);

    var chosenProduct = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            chosenProduct = products[i];
            break;
        }
    }

    if (chosenProduct) {
        cart.push({
            id: chosenProduct.id,
            name: chosenProduct.name,
            price: chosenProduct.price,
            days: days
        });

        updateCartUI();
        alert(chosenProduct.name + " added to cart!");
    }
}

// Update cart counter, modal list, and total
function updateCartUI() {
    var cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.length;

    var cartList = document.getElementById("cartItemsList");
    cartList.innerHTML = "";

    var totalCost = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        for (var i = 0; i < cart.length; i++) {
            var itemTotal = cart[i].price * cart[i].days;
            totalCost += itemTotal;

            var itemDiv = document.createElement("div");
            itemDiv.className = "cart-item";
            itemDiv.innerHTML = 
                '<div>' +
                    '<strong>' + cart[i].name + '</strong><br>' +
                    '<small>₹' + cart[i].price + ' x ' + cart[i].days + ' days = ₹' + itemTotal + '</small>' +
                '</div>' +
                '<button class="remove-btn" onclick="removeFromCart(' + i + ')">Remove</button>';

            cartList.appendChild(itemDiv);
        }
    }

    document.getElementById("cartTotal").innerText = "₹" + totalCost;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Category filter
function filterCategory(categoryName) {
    currentCategory = categoryName;

    // Toggle button style
    var buttons = document.getElementsByClassName("cat-btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
        if (buttons[i].innerText === categoryName) {
            buttons[i].classList.add("active");
        }
    }

    if (categoryName === "All") {
        showProducts(products);
        return;
    }

    var filtered = [];
    for (var j = 0; j < products.length; j++) {
        if (products[j].category === categoryName) {
            filtered.push(products[j]);
        }
    }
    showProducts(filtered);
}

// Search functionality
document.getElementById("searchBtn").onclick = function () {
    var query = document.getElementById("searchInput").value.toLowerCase();
    var filtered = [];

    for (var i = 0; i < products.length; i++) {
        var name = products[i].name.toLowerCase();
        if (name.includes(query)) {
            filtered.push(products[i]);
        }
    }
    showProducts(filtered);
};

// Sort low/high
function sortProducts() {
    var sortType = document.getElementById("sortSelect").value;
    var list = [...products];

    if (sortType === "low") {
        list.sort(function (a, b) { return a.price - b.price; });
    } else if (sortType === "high") {
        list.sort(function (a, b) { return b.price - a.price; });
    }

    showProducts(list);
}

// Open and Close Cart Modal
var modal = document.getElementById("cartModal");

document.getElementById("cartBtn").onclick = function () {
    modal.style.display = "block";
};

document.getElementById("closeCart").onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Checkout
document.getElementById("checkoutBtn").onclick = function () {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order placed successfully (Demo)!");
    cart = [];
    updateCartUI();
    modal.style.display = "none";
};

// Initial load
showProducts(products);