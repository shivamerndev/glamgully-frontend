import React, { useState } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

const CheckoutForm = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [isOpen, setIsOpen] = useState(false);
    const toggleHandle = () => { setIsOpen(!isOpen) }
    const obj = { fname: "", lname: "", address: "", apart: "", city: "", state: "", pincode: "", phone: "", country: "india" }
    const [af, setaddform] = useState(obj)


    const handleNextBtn = (e) => {
        try {
            e.preventDefault()
            console.log(af);
            navigate(`/checkout/order/${productId || "cart"}`, {
                state: {
                    address: af
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-xl font-semibold text-gray-700 mx-auto bg-white">
            <OrderSummary toggleHandle={toggleHandle} isOpen={isOpen} />

            <form onSubmit={(e) => handleNextBtn(e)} id="orderform" className="mt-4 px-6" >
                <h3 className="text-md font-medium mb-2">Delivery Detail</h3>
                <div className="space-y-4">
                    <select onChange={(e) => setaddform({ ...af, country: e.target.value })} value={af.country} className="w-full border border-gray-400  rounded-lg px-3 py-2 focus:outline-none">
                       <option  value="india">India</option>
                    </select>

                    <div className="flex gap-3">
                        <input onChange={(e) => setaddform({ ...af, fname: e.target.value })} required value={af.fname}

                            type="text"
                            placeholder="First name"
                            className="w-1/2   rounded-lg px-3 py-2"
                        />
                        <input onChange={(e) => setaddform({ ...af, lname: e.target.value })} required value={af.lname}
                            type="text"
                            placeholder="Last name"
                            className="w-1/2  rounded-lg px-3 py-2"
                        />
                    </div>

                    <input onChange={(e) => setaddform({ ...af, address: e.target.value })} required value={af.address}
                        type="text"
                        placeholder="Address"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input onChange={(e) => setaddform({ ...af, apart: e.target.value })}
                        value={af.apart}
                        type="text"
                        placeholder="Apartment, suite, etc. (optional)"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input onChange={(e) => setaddform({ ...af, city: e.target.value })} required value={af.city}
                        type="text"
                        placeholder="City"
                        className="w-full  rounded-lg px-3 py-2" />
                    <select required value={af.state} onChange={(e) => setaddform({ ...af, state: e.target.value })} className="w-full  border border-gray-400 outline-none rounded-lg px-3 py-2">
                        <option>Jharkhand</option>
                        <option>Bihar</option>
                        <option>Mumbai</option>
                        <option>Uttar Pradesh</option>
                    </select>
                    <input onChange={(e) => setaddform({ ...af, pincode: e.target.value })} required value={af.pincode}
                        type="text"
                        placeholder="PIN code"
                        className="w-full  rounded-lg px-3 py-2" />
                    <input onChange={(e) => setaddform({ ...af, phone: e.target.value })} required value={af.phone}
                        type="text"
                        placeholder="Phone"
                        className="w-full  rounded-lg px-3 py-2" />
                </div>

                <label className="inline-flex items-center text-sm mt-4">
                    <input type="checkbox" className="mr-2" />
                    Save this information for next time
                </label>
                <button type="submit" className="w-full bg-black text-white rounded-full py-3 text-center hover:bg-gray-900 transition">
                    Next
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
