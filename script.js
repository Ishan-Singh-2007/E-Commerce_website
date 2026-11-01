
const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", icon: "🎧", price: 199, rating: 4.8, desc: "Premium sound for music and calls." },
    { id: 2, name: "Bluetooth Speaker", category: "Electronics", icon: "🔊", price: 149, rating: 4.6, desc: "Portable speaker with clear sound." },
    { id: 3, name: "Laptop", category: "Electronics", icon: "💻", price: 599, rating: 4.9, desc: "Useful for coding and productivity." },
    { id: 4, name: "Tablet", category: "Electronics", icon: "📱", price: 299, rating: 4.5, desc: "A handy device for work and study." },
    { id: 5, name: "Smart Watch", category: "Electronics", icon: "⌚", price: 99, rating: 4.3, desc: "Track activities and daily notifications." },
    { id: 6, name: "Power Bank", category: "Electronics", icon: "🔋", price: 49, rating: 4.4, desc: "Portable backup charging." },
    { id: 7, name: "Mechanical Keyboard", category: "Electronics", icon: "⌨️", price: 89, rating: 4.7, desc: "Comfortable typing for long sessions." },
    { id: 8, name: "Wireless Mouse", category: "Electronics", icon: "🖱️", price: 39, rating: 4.2, desc: "Compact mouse for laptop users." },

    { id: 9, name: "Gaming Console", category: "Gaming", icon: "🎮", price: 499, rating: 4.9, desc: "Enjoy games during your free time." },
    { id: 10, name: "Gaming Controller", category: "Gaming", icon: "🕹️", price: 129, rating: 4.6, desc: "A controller for your gaming setup." },
    { id: 11, name: "Gaming Headset", category: "Gaming", icon: "🎧", price: 119, rating: 4.5, desc: "Immersive audio for gaming." },
    { id: 12, name: "Gaming Monitor", category: "Gaming", icon: "🖥️", price: 349, rating: 4.8, desc: "A large display for your setup." },

    { id: 13, name: "DSLR Camera", category: "Cameras", icon: "📸", price: 799, rating: 4.9, desc: "Capture photos for special occasions." },
    { id: 14, name: "Action Camera", category: "Cameras", icon: "🎥", price: 399, rating: 4.6, desc: "Compact camera for travel videos." },
    { id: 15, name: "Camera Tripod", category: "Cameras", icon: "📷", price: 59, rating: 4.3, desc: "Stable support for photos and videos." },
    { id: 16, name: "Ring Light", category: "Cameras", icon: "💡", price: 79, rating: 4.4, desc: "Lighting for video calls and content." },

    { id: 17, name: "Scientific Calculator", category: "Study", icon: "🧮", price: 29, rating: 4.7, desc: "Useful for maths and engineering." },
    { id: 18, name: "Study Lamp", category: "Study", icon: "💡", price: 39, rating: 4.2, desc: "Desk lighting for study sessions." },
    { id: 19, name: "Drawing Tablet", category: "Study", icon: "✍️", price: 199, rating: 4.5, desc: "Digital drawing and note-taking." },
    { id: 20, name: "Projector", category: "Study", icon: "📽️", price: 449, rating: 4.8, desc: "Presentations and big-screen viewing." },

    { id: 21, name: "Travel Backpack", category: "Lifestyle", icon: "🎒", price: 69, rating: 4.4, desc: "A handy bag for short trips." },
    { id: 22, name: "Camping Tent", category: "Lifestyle", icon: "⛺", price: 249, rating: 4.6, desc: "Tent for outdoor adventures." },
    { id: 23, name: "Yoga Mat", category: "Lifestyle", icon: "🧘", price: 19, rating: 4.1, desc: "A comfortable exercise mat." },
    { id: 24, name: "Electric Guitar", category: "Lifestyle", icon: "🎸", price: 299, rating: 4.7, desc: "Try a guitar before purchasing one." },
    { id: 25, name: "Portable Fan", category: "Lifestyle", icon: "🌀", price: 29, rating: 4.0, desc: "Compact fan for personal use." }
];

let selectedCategory = "All";
let cart = [];

// Select HTML elements
const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");

const cartCount = document.querySelector("#cartCount");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const checkoutBtn = document.querySelector("#checkoutBtn");

const toast = document.querySelector("#toast");


// Show notification
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}


// Display products
function displayProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    let filteredProducts = products.filter(function (product) {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.desc.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    // Sort products
    if (sortSelect.value === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortSelect.value === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    resultCount.textContent =
        filteredProducts.length + " products found";

    if (filteredProducts.length === 0) {
        productGrid.innerHTML =
            '<p class="no-products">No products found. Try another search.</p>';
        return;
    }

    productGrid.innerHTML = filteredProducts.map(function (product) {
        return `
            <article class="product-card">
                <div class="product-visual">
                    ${product.icon}
                </div>

                <div class="product-info">
                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>${product.name}</h3>

                    <p class="product-desc">${product.desc}</p>

                    <span class="product-rating">
                        ★ ${product.rating} · Demo rating
                    </span>

                    <div class="price-line">
                        <strong>₹${product.price}</strong>
                        <small>/ day</small>
                    </div>

                    <select class="duration-select"
                            id="duration-${product.id}"
                            aria-label="Rental duration for ${product.name}">
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7" selected>7 days</option>
                        <option value="15">15 days</option>
                        <option value="30">30 days</option>
                    </select>

                    <button class="add-btn"
                            data-id="${product.id}">
                        🛒 Add to Cart
                    </button>
                </div>
            </article>
        `;
    }).join("");
}


// Add selected product to cart
productGrid.addEventListener("click", function (event) {
    const button = event.target.closest(".add-btn");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const product = products.find(function (item) {
        return item.id === productId;
    });

    const durationSelect =
        document.querySelector("#duration-" + productId);

    const days = Number(durationSelect.value);

    // If the same product and duration already exist, increase quantity
    const existingItem = cart.find(function (item) {
        return item.id === productId && item.days === days;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            icon: product.icon,
            price: product.price,
            days: days,
            quantity: 1
        });
    }

    updateCart();
    showToast(product.name + " added to cart!");
});


// Calculate total rental cost
function calculateCartTotal() {
    return cart.reduce(function (total, item) {
        return total + item.price * item.days * item.quantity;
    }, 0);
}


// Update cart display
function updateCart() {
    const totalItems = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent =
        "₹" + calculateCartTotal().toLocaleString("en-IN");

    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Add some products!</p>';
        return;
    }

    cartItems.innerHTML = cart.map(function (item, index) {
        const itemTotal = item.price * item.days * item.quantity;

        return `
            <div class="cart-item">
                <div class="cart-emoji">${item.icon}</div>

                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}/day × ${item.days} days</p>
                    <p>Quantity: ${item.quantity}</p>
                    <strong>₹${itemTotal.toLocaleString("en-IN")}</strong>
                </div>

                <button class="remove-btn" data-index="${index}">
                    Remove
                </button>
            </div>
        `;
    }).join("");
}


// Remove item from cart
cartItems.addEventListener("click", function (event) {
    const button = event.target.closest(".remove-btn");

    if (!button) return;

    const index = Number(button.dataset.index);
    cart.splice(index, 1);

    updateCart();
    showToast("Item removed from cart.");
});


// Open and close cart
document.querySelector("#openCart").addEventListener("click", function () {
    updateCart();
    cartOverlay.classList.add("show");
});

document.querySelector("#closeCart").addEventListener("click", function () {
    cartOverlay.classList.remove("show");
});

// Close cart by clicking outside the panel
cartOverlay.addEventListener("click", function (event) {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("show");
    }
});


// Demo checkout
checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
    }

    const total = calculateCartTotal();

    alert(
        "Demo order confirmed!\n\n" +
        "Items: " + cartCount.textContent + "\n" +
        "Rental total: ₹" + total.toLocaleString("en-IN") +
        "\n\nNo real payment has been made."
    );

    cart = [];
    updateCart();
    cartOverlay.classList.remove("show");
});


// Search products
searchInput.addEventListener("input", displayProducts);

searchButton.addEventListener("click", function () {
    displayProducts();
    document.querySelector("#products").scrollIntoView({
        behavior: "smooth"
    });
});

// Search when Enter is pressed
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        displayProducts();
    }
});


// Category filters
document.querySelectorAll(".category").forEach(function (button) {
    button.addEventListener("click", function () {
        document.querySelectorAll(".category").forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        displayProducts();
    });
});


// Sort products
sortSelect.addEventListener("change", displayProducts);


// Initial page setup
displayProducts();
updateCart();