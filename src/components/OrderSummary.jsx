import React, { useActionState, useContext, useEffect, useState } from "react";
import { ProductDataContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { handlePayment } from "../pages/Payment"


const OrderSummary = ({ toggleHandle, isOpen = true }) => {
    const { productId } = useParams()
    const { singleProduct } = useContext(ProductDataContext)
    const [product, setproduct] = useState()
    const [amount, setamount] = useState()

    useEffect(() => {
        singleProduct(productId).then(data => {
            setproduct(data)
            setamount(data.price * data.quantity)
        })
    }, [productId])

    return (product &&
        <div className="max-w-md mx-auto my-2  text-lg bg-zinc-100  rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center p-4 cursor-pointer">
                <h2 onClick={toggleHandle} className="text-sm font-medium text-blue-600">Order summary <span className=" inline-block"><IoIosArrowDown /></span>
                </h2>
                <span className="font-semibold">₹{product.price * product.quantity}.00</span>
            </div>
            <hr className="text-gray-400 " />
            {/* Dropdown Content */}
            {isOpen && (
                <div className="space-y-4 mt-4 p-4 ">
                    {/* Product Row */}
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <img
                                src={product.productimage}
                                alt="Product"
                                className="w-14 h-14 object-cover rounded"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {product.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{product.title}</p>
                            <p className="text-sm mt-1 text-right">₹{product.price}.00</p>
                        </div>
                    </div>

                    {/* Discount Code */}
                    <div className="flex items-center gap-2">
                        <input

                            onChange={(e) => e.target.value}
                            type="text"
                            placeholder="Discount code"
                            className="flex-1 border rounded px-3 py-2 text-sm" />
                        <button className={`px-4 py-2 bg-blue-200 text-sm rounded hover:bg-purple-400`}>
                            Apply
                        </button>
                    </div>

                    {/* Subtotal and Shipping */}
                    <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{product.price * product.quantity}.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Shipping Charge{" "}
                                <span className="text-gray-400 cursor-help">ⓘ</span>
                            </span>
                            <span className="text-gray-500">Enter shipping address</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between pt-2 border-t mt-2 font-semibold">
                        <span>Total</span>
                        <span>INR ₹{product.price * product.quantity}.00</span>
                    </div>
                    {!toggleHandle && <button onClick={() => handlePayment(amount)}
                        className="w-full bg-black mt-4 text-white rounded-full py-3 text-center hover:bg-gray-900 transition">
                        Pay Now
                    </button>}
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
