// ================================
// SEARCH
// ================================

const searchIcon = document.getElementById("search-icon");
const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("search-input");

searchIcon.addEventListener("click", function(event) {

    event.preventDefault();

    if (searchBox.style.display === "block") {
        searchBox.style.display = "none";
    } else {
        searchBox.style.display = "block";
        searchInput.focus();
    }

});


// ================================
// ALL PRODUCTS
// ================================

const allProductCards = document.querySelectorAll(
    ".product-card, .men-product-card, .women-product-card, .deal-card"
);


// ================================
// ADD WISHLIST + CART BUTTONS
// ================================

allProductCards.forEach(function(card) {

    const productName = card.querySelector("h3").textContent.trim();


    // ----------------
    // WISHLIST BUTTON
    // ----------------

    let wishlistButton = card.querySelector(".wishlist-btn");

    if (!wishlistButton) {

        wishlistButton = document.createElement("button");

        wishlistButton.classList.add("wishlist-btn");
        wishlistButton.textContent = "❤️";

        card.appendChild(wishlistButton);

    }

    const wishlistKey = "wishlist-" + productName;

    if (localStorage.getItem(wishlistKey) === "active") {
        wishlistButton.classList.add("active");
    }


    wishlistButton.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        wishlistButton.classList.toggle("active");

        if (wishlistButton.classList.contains("active")) {

            localStorage.setItem(wishlistKey, "active");

        } else {

            localStorage.removeItem(wishlistKey);

        }

        showWishlist();
        updateCartCount();
        updateWishlistCount();

    });


    // ----------------
    // CART BUTTON
    // ----------------

    let cartButton = card.querySelector(".cart-btn");

    if (!cartButton) {

        cartButton = document.createElement("button");

        cartButton.classList.add("cart-btn");
        cartButton.textContent = "ADD TO CART";

        const productInfo = card.querySelector(
            ".product-info, .men-product-info, .women-product-info, .deal-info"
        );

        if (productInfo) {
            productInfo.appendChild(cartButton);
        }

    }


    // Check if already in cart

    const cartKey = "cart-" + productName;

    if (localStorage.getItem(cartKey) === "active") {
        cartButton.textContent = "ADDED ✓";
    }


    // Cart Click

    cartButton.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        localStorage.setItem(cartKey, "active");

        cartButton.textContent = "ADDED ✓";

        showCart();

        updateCartCount();

    });

});


// ================================
// PRODUCT SEARCH
// ================================

searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value
        .toLowerCase()
        .trim()
        .replace(/s\b/g, "");

    allProductCards.forEach(function(card) {

        const productName = card.querySelector("h3")
            .textContent
            .toLowerCase()
            .replace(/s\b/g, "");

        const categoryElement = card.querySelector(
            ".product-category, .deal-category"
        );

        const category = categoryElement
            ? categoryElement.textContent
                .toLowerCase()
                .replace(/s\b/g, "")
            : "";

        if (
            searchValue === "" ||
            productName.includes(searchValue) ||
            category.includes(searchValue)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});

// ================================
// SHOW WISHLIST
// ================================
function updateWishlistCount() {
    const wishlistCount =
        document.getElementById("wishlist-count");

    if (!wishlistCount) {
        return;
    }

    let count = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (
            key &&
            key.startsWith("wishlist-") &&
            localStorage.getItem(key) === "active"
        ) {
            count++;
        }
    }

    wishlistCount.textContent = count;
}
function showWishlist() {

    const wishlistContainer =
        document.getElementById("wishlist-container");

    if (!wishlistContainer) {
        return;
    }

    wishlistContainer.innerHTML = "";

    let wishlistItemsFound = false;

    allProductCards.forEach(function(card) {

        const productName =
            card.querySelector("h3").textContent.trim();

        const wishlistKey =
            "wishlist-" + productName;

        if (localStorage.getItem(wishlistKey) === "active") {

            wishlistItemsFound = true;

            const wishlistProduct =
                card.cloneNode(true);

            wishlistProduct.style.display = "";

            const wishlistButton =
                wishlistProduct.querySelector(".wishlist-btn");

            wishlistButton.classList.add("active");

            wishlistButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    localStorage.removeItem(wishlistKey);

                    showWishlist();
                    updateWishlistCount();

                    const originalButton =
                        card.querySelector(".wishlist-btn");

                    originalButton.classList.remove("active");

                }
            );

            wishlistContainer.appendChild(wishlistProduct);

        }

    });

    // Empty Wishlist

    if (!wishlistItemsFound) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "Your wishlist is empty.";

        emptyMessage.style.textAlign = "center";
        emptyMessage.style.padding = "40px";
        emptyMessage.style.fontSize = "16px";

        wishlistContainer.appendChild(emptyMessage);

    }

}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let count = 0;

    allProductCards.forEach(function(card) {
        const productName =
            card.querySelector("h3").textContent.trim();

        const cartKey = "cart-" + productName;

        if (localStorage.getItem(cartKey) === "active") {
            count++;
        }
    });

    cartCount.textContent = count;
}
// ================================
// SHOW CART
// ================================

function showCart() {

    const cartContainer =
        document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    let cartItemsFound = false;

    allProductCards.forEach(function(card) {

        const productName =
            card.querySelector("h3").textContent.trim();

        const cartKey =
            "cart-" + productName;

        if (localStorage.getItem(cartKey) === "active") {

            cartItemsFound = true;

            // Create a fresh Cart card
            const cartProduct =
                document.createElement("div");

            cartProduct.className = "cart-product";


            // Product Image
            const originalImage =
                card.querySelector("img");

            if (originalImage) {

                const cartImage =
                    document.createElement("img");

                cartImage.src = originalImage.src;
                cartImage.alt = productName;

                cartProduct.appendChild(cartImage);

            }


            // Product Information
            const cartInfo =
                document.createElement("div");

            cartInfo.className = "cart-product-info";


            const cartName =
                document.createElement("h3");

            cartName.textContent = productName;

            cartInfo.appendChild(cartName);


            // View Deal link
            const originalDeal =
                card.querySelector("a");

            if (originalDeal) {

                const dealLink =
                    document.createElement("a");

                dealLink.href = originalDeal.href;
                dealLink.target = "_blank";
                dealLink.textContent = "VIEW DEAL";

                dealLink.className = "cart-deal-btn";

                cartInfo.appendChild(dealLink);

            }


            cartProduct.appendChild(cartInfo);


            // Remove Button
            const removeButton =
                document.createElement("button");

            removeButton.className =
                "remove-cart-btn";

            removeButton.textContent =
                "REMOVE FROM CART";


            removeButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();
                    event.stopPropagation();

                    localStorage.removeItem(cartKey);

                    const originalButton =
                        card.querySelector(".cart-btn");

                    if (originalButton) {
                        originalButton.textContent =
                            "ADD TO CART";
                    }

                    showCart();
                    updateCartCount();

                }
            );


            cartProduct.appendChild(removeButton);

            cartContainer.appendChild(cartProduct);

        }

    });


// Empty Cart

if (!cartItemsFound) {

    const emptyMessage =
        document.createElement("p");

    emptyMessage.textContent =
        "Your cart is empty. Start exploring our latest styles.";

    emptyMessage.style.textAlign = "center";
    emptyMessage.style.padding = "50px 20px";
    emptyMessage.style.fontSize = "17px";
    emptyMessage.style.color = "#aaa39a";

    cartContainer.appendChild(emptyMessage);
}
}
// ================================
// NAVBAR WISHLIST
// ================================

const wishlistIcon =
    document.getElementById("wishlist-icon");

if (wishlistIcon) {

    wishlistIcon.addEventListener("click", function(event) {

        event.preventDefault();

        showWishlist();

        const wishlistSection =
            document.querySelector(".wishlist-section");

        if (wishlistSection) {

            wishlistSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


// ================================
// NAVBAR CART
// ================================

const cartIcon =
    document.getElementById("cart-icon");

if (cartIcon) {

    cartIcon.addEventListener("click", function(event) {

        event.preventDefault();

        showCart();

        const cartSection =
            document.querySelector(".cart-section");

        if (cartSection) {

            cartSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}

function showAllMenProducts() {

    document.querySelectorAll(".men-product-card").forEach(function(card) {
        card.style.display = "";
    });

    document.querySelector(".men-collection").scrollIntoView({
        behavior: "smooth"
    });
}
function showWomenCategory(categoryName) {

    document.querySelectorAll(".women-product-card").forEach(function(card) {

        const category = card.querySelector(".product-category");

        if (
            category &&
            category.textContent.trim().toLowerCase() === categoryName.toLowerCase()
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    document.querySelector(".women-collection").scrollIntoView({
        behavior: "smooth"
    });
}
function showAllWomenProducts() {
    document.querySelectorAll(".women-product-card").forEach(function(card) {
        card.style.display = "";
    });

    document.querySelector(".women-collection").scrollIntoView({
        behavior: "smooth"
    });
}
function showMenCategory(categoryName) {

    document.querySelectorAll(".men-product-card").forEach(function(card) {

        const category = card.querySelector(".product-category");

        if (
            category &&
            category.textContent.trim().toLowerCase() === categoryName.toLowerCase()
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    document.querySelector(".men-collection").scrollIntoView({
        behavior: "smooth"
    });
}

updateCartCount();
updateWishlistCount();
// ALWAYS START FROM TOP ON PAGE LOAD

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
    window.scrollTo(0, 0);
});
