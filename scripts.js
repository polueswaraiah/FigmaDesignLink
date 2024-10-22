// Sample cart data (replace this with your fetch or imported JSON)
const cartData = {
    "original_total_price": 250000,
    "items": [
        {
            "id": 49839206859071,
            "quantity": 1,
            "title": "Asgaard sofa",
            "price": 25000000, // Price in smallest currency unit (e.g., paise)
            "featured_image": {
                "url": "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481"
            }
        }
    ],
    "currency": "INR"
};

// Function to calculate subtotal and total
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cartData.items.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;

        // Create a new row for each item
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.featured_image.url}" alt="${item.title}" style="max-width: 80px; margin-right: 10px;">
                ${item.title}
            </td>
            <td>Rs. ${(item.price / 100).toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            </td>
            <td>Rs. ${(itemSubtotal / 100).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update subtotal and total display
    subtotalElement.innerText = `Rs. ${(subtotal / 100).toFixed(2)}`;
    totalElement.innerText = `Rs. ${(subtotal / 100).toFixed(2)}`; // For now, total is same as subtotal

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value);
            const itemId = parseInt(event.target.getAttribute('data-id'));
            const item = cartData.items.find(i => i.id === itemId);
            if (item) {
                item.quantity = newQuantity; // Update quantity in the cart data
                updateCart(); // Recalculate cart
            }
        });
    });
}

// Initial call to populate the cart
updateCart();
