document.addEventListener('DOMContentLoaded', function () {
    const cart = loadCart(); // Load cart from local storage
    const cartList = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add items to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            const itemPrice = parseFloat(button.getAttribute('data-price'));

            if (cart.has(itemName)) {
                const item = cart.get(itemName);
                item.quantity += 1;
                item.totalPrice = item.quantity * item.price;
            } else {
                cart.set(itemName, {
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    totalPrice: itemPrice
                });
            }

            saveCart(cart);
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - ₦${item.totalPrice.toFixed(2)} (x${item.quantity})
                <button class="remove-item" data-item="${item.name}">Remove</button>
            `;
            cartList.appendChild(li);
            total += item.totalPrice;
        });

        totalPriceEl.textContent = total.toFixed(2);
        attachRemoveHandlers();
    }

    // Attach remove handlers to each remove button
    function attachRemoveHandlers() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemName = button.getAttribute('data-item');
                cart.delete(itemName); // Remove item from cart
                saveCart(cart);
                updateCart();
            });
        });
    }

    // Load cart from local storage
    function loadCart() {
        const cartData = localStorage.getItem('cart');
        return cartData ? new Map(JSON.parse(cartData)) : new Map();
    }

    // Save cart to local storage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify([...cart]));
    }

    updateCart(); // Update cart display on page load
});


    // Simple slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('current');
            if (index === currentSlide) {
                slide.classList.add('current');
            }
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide();
    }, 3000);


    // Show/Hide the "Back to Top" button based on scroll position
window.addEventListener('scroll', function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Smooth scroll to the top when the button is clicked
document.getElementById('back-to-top').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

    


