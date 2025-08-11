import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeFromCart } from "../utils/local.cart";
import { ProductDataContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";

const Cart = () => {
    const navigate = useNavigate();
    let cart = JSON.parse(localStorage.getItem("cart"));
    const [cartItems, setcartItems] = useState();
    const { setlengthc, singleProduct } = useContext(ProductDataContext);
    const [outstock, setoutstock] = useState({});
    const [warn, setWarn] = useState(false)

    useEffect(() => {
        setcartItems(cart);
        return () => {
            const cart = JSON.parse(localStorage.getItem("cart"));
            setlengthc(cart?.length);
        };
    }, []);

    useEffect(() => {
        const checkStock = async () => {
            let tempOutstock = {};

            for (let item of cartItems) {
                try {
                    const p = await singleProduct(item._id);
                    if (p.quantity < 1) {
                        tempOutstock[p.title] = true;
                    }
                } catch (err) {
                    console.error("Error checking product:", err);
                }
            }
            setoutstock(tempOutstock);
            if (warn) {
                setWarn(Object.keys(tempOutstock).length > 0); //warn manage here.
            }
        };
        if (cartItems) {
            checkStock();
        }
    }, [cartItems]);

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
        <div className="max-w-3xl mx-auto p-4 font-sans relative bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
                    Your Cart
                </h2>
                <a
                    href="/product/all"
                    className="text-sm font-medium text-rose-400 underline hover:text-rose-600 flex items-center gap-1 transition"
                >
                    Continue Shopping
                    <FaArrowRightLong size={8} />
                </a>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
                {cartItems.map((item, i) => (
                    <div key={i} className="flex  items-center py-5">
                        {/* Product Image */}
                        <img
                            onClick={() => navigate(`/product/${item._id}`)}
                            src={item.productimage[0]}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                        />

                        {/* Product Details */}
                        <div className="flex-1 ml-5">
                            <h3 className="text-lg font-medium capitalize text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-500">Rs. {item.price}</p>
                            {outstock[item.title] && (
                                <span className="text-red-500  text-xs font-bold capitalize">
                                    Out of stock
                                </span>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-3">
                                <button
                                    onClick={() => decrement(item._id)}
                                    className="w-8 h-8 border border-gray-300 rounded-l hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => increment(item._id)}
                                    className="w-8 h-8 border border-gray-300 rounded-r hover:bg-gray-100"
                                >
                                    +
                                </button>
                                {/* Delete Button */}
                                <button
                                    onClick={() => {
                                        removeFromCart(item._id);
                                        const newcart = JSON.parse(localStorage.getItem("cart"));
                                        setlengthc(newcart?.length);
                                        if (newcart.length === 0) {
                                            localStorage.removeItem("cart");
                                            setcartItems(null);
                                        } else {
                                            setcartItems(newcart);
                                        }
                                    }}
                                    className="ml-5 text-xl text-red-400 hover:text-red-500 transition"
                                >
                                    <MdOutlineDeleteOutline />
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="ml-6 text-base font-semibold text-gray-800">
                            Rs. {item.price * item.quantity}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="pt-6 text-right border-t border-gray-200 mt-6">
                <p className="text-gray-700 text-base mb-2">
                    Estimated Total:{" "}
                    <span className="font-bold text-lg">Rs. {estimatedTotal}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                    Taxes included. Discounts and{" "}
                    <a className="underline cursor-pointer">shipping</a> calculated at
                    checkout.
                </p>
                {warn && (
                    <h1 className="text-center bg-red-500 text-base font-semibold rounded w-full px-4 absolute bottom-15 left-0 py-2 leading-5 text-gray-100">
                        {/* agar cart backend se ho to fully controlled ho but cart without user hai isliye compermise */}
                        Some products may be out of stock please Delete them to{" "}
                        <span className="text-green-300 font-bold">continue.</span>
                    </h1>
                )}
                <button
                    onClick={() => {
                        if (Object.keys(outstock).length <= 0) {
                            navigate("/checkout/cart");
                        } else {
                            alert("WARNING : Some products may be out of stock. please Delete them to continue");
                            setWarn(true)
                        }
                    }}
                    className={`${Object.keys(outstock).length > 0 ? "bg-gray-500" : "bg-rose-500"
                        } hover:bg-rose-600 text-white px-6 py-2 font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105`}>
                    Check Out
                </button>
            </div>
        </div>
    ) : (
        <div className="h-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 p-6">
            {/* Icon */}
            <div className="bg-white p-6 rounded-full shadow-md">
                <BsCartX className="text-6xl text-rose-500" />
            </div>

            {/* Text */}
            <h1 className="font-bold uppercase text-2xl md:text-3xl text-center tracking-wide">
                Your cart is empty
            </h1>
            <p className="text-gray-500 text-center max-w-md">
                Looks like you haven't added anything to your cart yet.
            </p>

            {/* Button */}
            <a
                href="/product/all"
                className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
            >
                Continue Shopping
                <FaArrowRightLong size={18} />
            </a>
        </div>
    );
};
export default Cart;
