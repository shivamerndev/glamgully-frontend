import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeFromCart } from '../utils/local.cart'
import { ProductDataContext } from "../context/ProductContext";


const Cart = () => {

    let cart = JSON.parse(localStorage.getItem("cart"));
    const [cartItems, setcartItems] = useState();
    const { setlengthc } = useContext(ProductDataContext)

    useEffect(() => {
        // let cart = JSON.parse(localStorage.getItem("cart"));
        setcartItems(cart);
        return () => {
            const cart = JSON.parse(localStorage.getItem("cart"))
            setlengthc(cart?.length)
        }
    }, []);

    const estimatedTotal = cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const increment = (itemId) => {
        cart = cart.map((item) => {
            // If the item's _id matches the itemId passed to increment, increase its quantity by 1
            if (item._id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            // Otherwise, return the item unchanged
            return item;
        });
        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Update state
        setcartItems(cart);
    };

    const decrement = (itemId) => {
        cart = cart.map((item) => {
            if (item._id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        setcartItems(cart);
    };

    return cartItems ? (
        <div className="max-w-xl mx-auto p-4 font-sans">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-medium">Your cart</h2>
                <a href="/product/all" className="text-base underline">
                    Continue shopping
                </a>
            </div>

            <div className="border-t border-gray-200">
                {cartItems.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center py-4 border-b border-gray-100"
                    >
                        <img
                            src={item.productimage}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Rs. {item.price}</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => decrement(item._id)}
                                    className="px-2 border border-gray-300">-</button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                    onClick={() => increment(item._id)}
                                    className="px-2 border border-gray-300">
                                    +
                                </button>
                                <button onClick={() => {
                                    removeFromCart(item._id)
                                    const newcart = JSON.parse(localStorage.getItem("cart"))
                                    setlengthc(newcart?.length)
                                    if (newcart.length === 0) {
                                        localStorage.removeItem("cart");
                                        setcartItems(null)
                                    } else {
                                        setcartItems(newcart)
                                    }
                                }} className="ml-4 text-2xl font-extralight text-red-400"><MdOutlineDeleteOutline /></button>
                            </div>
                        </div>
                        <div className="ml-4 text-sm font-medium">
                            Rs. {item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-4 text-right">
                <p className="text-gray-700 text-sm mb-2">
                    Estimated total{" "}
                    <span className="font-semibold text-lg">Rs. {estimatedTotal}</span>
                </p>
                <p className="text-xs text-gray-500">
                    Taxes included. Discounts and <a className="underline">shipping</a>{" "}
                    calculated at checkout.
                </p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded">
                    Check out
                </button>
            </div>
        </div>
    ) : (
        <div className="text-2xl flex flex-col justify-center items-center gap-8 bg-amber-100 border-t h-full">
            <h1 className="font-semibold uppercase text-3xl">Your cart is empty.</h1>
            <a className="bg-rose-200 px-5 py-2 rounded-2xl" href="/product/all">
                Continue shopping ➡️
            </a>
        </div>
    );
};
export default Cart;
