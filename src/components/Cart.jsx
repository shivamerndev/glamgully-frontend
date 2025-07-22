import React from "react";

const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: "Pearly Bow Pendant Necklace",
            price: 419.0,
            image: "/src/assets/banner.webp",
            quantity: 1,
        },
        {
            id: 2,
            name: "11:11 Necklace",
            price: 329.0,
            image: "/src/assets/ear.webp",
            quantity: 1,
        },
    ];

    const estimatedTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-xl mx-auto p-4 font-sans">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">Your cart</h2>
                <a href="#" className="text-sm underline">Continue shopping</a>
            </div>

            <div className="border-t border-gray-200">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-100">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-2">
                                <button className="px-2 border border-gray-300">-</button>
                                <span className="px-4">{item.quantity}</span>
                                <button className="px-2 border border-gray-300">+</button>
                                <button className="ml-4 text-red-500">🗑️</button>
                            </div>
                        </div>
                        <div className="ml-4 text-sm font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>

            <div className="pt-4 text-right">
                <p className="text-gray-700 text-sm mb-2">Estimated total <span className="font-semibold text-lg">Rs. {estimatedTotal.toFixed(2)}</span></p>
                <p className="text-xs text-gray-500">Taxes included. Discounts and <a href="#" className="underline">shipping</a> calculated at checkout.</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded">Check out</button>
            </div>
        </div>
    );
};

export default Cart;
