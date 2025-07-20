
export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // check if product already in cart
    const existingIndex = cart.findIndex(item => item._id === product._id);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
        return "Added successfully"
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
    localStorage.removeItem("cart");
};

