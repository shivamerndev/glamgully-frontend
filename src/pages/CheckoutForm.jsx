import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const CheckoutForm = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const toggleHandle = () => { setIsOpen(!isOpen) }
    return (
        <div className="max-w-xl font-semibold text-gray-700 mx-auto bg-white">
            <OrderSummary toggleHandle={toggleHandle} isOpen={isOpen} />

            <div id="orderform" className="mt-4 px-6" >
                <h3 className="text-md font-medium mb-2">Delivery</h3>
                <div className="space-y-4">
                    <select defaultValue={"india"} className="w-full border-2 border-gray-400  rounded-lg px-3 py-2 focus:outline-none">
                        <option>India</option>
                    </select>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="First name"
                            className="w-1/2   rounded-lg px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="w-1/2  rounded-lg px-3 py-2"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full  rounded-lg px-3 py-2" />
                    <select className="w-full  border-2 border-gray-400 outline-none rounded-lg px-3 py-2">
                        <option>Jharkhand</option>
                    </select>
                    <input
                        type="text"
                        placeholder="PIN code"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full  rounded-lg px-3 py-2" />
                </div>

                <label className="inline-flex items-center text-sm mt-4">
                    <input type="checkbox" className="mr-2" />
                    Save this information for next time
                </label>
                <button onClick={() => { navigate(`/checkout/order/${productId}`) }} className="w-full bg-black text-white rounded-full py-3 text-center hover:bg-gray-900 transition">
                    Next
                </button>
            </div>
        </div>
    );
};

export default CheckoutForm;
