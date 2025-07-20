import React, { useState } from "react";

const OrderSummary = ({ toggleHandle, isOpen = true }) => {

    return (
        <div className="max-w-md mx-auto my-2  text-lg bg-zinc-100  rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center p-4 cursor-pointer">
                <h2 onClick={toggleHandle} className="text-sm font-medium text-blue-600">Order summary</h2>
                <span className="font-semibold">₹998.00</span>
            </div>
            <hr className="text-gray-400 " />
            {/* Dropdown Content */}
            {isOpen && (
                <div className="space-y-4 mt-4 p-4 ">
                    {/* Product Row */}
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <img
                                src="https://res.cloudinary.com/dgis42anh/image/upload/v1749370243/products/rqdosgeempredypf2n4g.webp"
                                alt="Product"
                                className="w-14 h-14 object-cover rounded"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">3in1 B/W Clover Bracelet</p>
                            <p className="text-sm mt-1 text-right">₹998.00</p>
                        </div>
                    </div>

                    {/* Discount Code */}
                    <div className="flex items-center gap-2">
                        <input
                            value={''}
                            onChange={(e) => e.target.value}
                            type="text"
                            placeholder="Discount code"
                            className="flex-1 border rounded px-3 py-2 text-sm" />
                        <button className={`px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300`}>
                            Apply
                        </button>
                    </div>

                    {/* Subtotal and Shipping */}
                    <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹998.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Shipping{" "}
                                <span className="text-gray-400 cursor-help">ⓘ</span>
                            </span>
                            <span className="text-gray-500">Enter shipping address</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between pt-2 border-t mt-2 font-semibold">
                        <span>Total</span>
                        <span>INR ₹998.00</span>
                    </div>
                    {!toggleHandle && <button onClick={() => { console.log("payment gateway") }} className="w-full bg-black mt-4 text-white rounded-full py-3 text-center hover:bg-gray-900 transition">
                        Pay Now
                    </button>}
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
