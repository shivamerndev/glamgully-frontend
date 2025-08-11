import React, { useActionState, useContext, useEffect, useState } from "react";
import { ProductDataContext } from "../context/ProductContext";
import { CustomerDataContext } from "../context/CustomerContext";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { handlePayment } from "../pages/Payment"


const OrderSummary = ({ toggleHandle, isOpen = true }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const customerAddress = location.state?.address || null;
    const { productId } = useParams()
    const { singleProduct, editProduct } = useContext(ProductDataContext)
    const { createCustomer } = useContext(CustomerDataContext);
    const [product, setproduct] = useState()
    const [amount, setamount] = useState()
    const [buyquantity, setbuyquantity] = useState(1)
    const productfromCart = JSON.parse(localStorage.getItem("cart"))

    useEffect(() => {
        setbuyquantity(productId?.split('&')[1])
    }, [])

    useEffect(() => {
        if (productId !== undefined) {
            singleProduct(productId.split('&')[0]).then(data => {
                setproduct(data)
                setamount(data.price * (buyquantity || data.quantity))
            })
        } else {
            setproduct(productfromCart)
            setamount(productfromCart.reduce((acc, item) => acc + (item.price * item.quantity), 0))
        }
    }, [productId, amount])


    const editQuantity = () => {
        try {
            if (product.length > 0) {
                product.forEach(elem => {
                    singleProduct(elem._id).then(data => {
                        const updatedProduct = { ...elem, quantity: data.quantity - elem.quantity };
                        editProduct(updatedProduct).then((res) => {
                            navigate("/product/all");
                        })
                    })
                });
                return;
            }
            const updatedProduct = { ...product, quantity: product.quantity - (buyquantity || 1) };
            editProduct(updatedProduct).then((res) => {
                navigate("/product/all");
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (product &&
        <div className="max-w-md mx-auto my-2  text-lg bg-zinc-100  rounded shadow">
            {/* Header */}
            <div className="flex justify-between items-center p-4 cursor-pointer">
                <h2 onClick={toggleHandle} className="text-sm font-medium text-blue-600">Order summary <span className=" inline-block"><IoIosArrowDown /></span>
                </h2>
                <span className="font-semibold">₹{amount}.00</span>
            </div>
            <hr className="text-gray-400 " />
            {/* Dropdown Content */}
            {isOpen && (
                <div className="space-y-4 mt-4 p-4 ">
                    {/* Product Row */}
                    {product?.length !== undefined ? product.map((product, i) => <div onClick={() => { navigate(`/product/${product._id}`) }} key={i} className="flex items-center  gap-4">
                        <div key={i} className="relative">
                            <img
                                src={product?.productimage[0]}
                                alt="Product"
                                className="w-14 h-14 object-cover rounded"
                            />
                            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {product.quantity}
                            </span>
                        </div>
                        <p className="text-sm mt- font-medium">{product.title}</p>
                        <div className="flex-1   ">
                            <p className="text-sm mt-1 text-right">₹{product.price * product.quantity}.00</p>
                        </div>
                    </div>)
                        :
                        <div className="flex items-start gap-4">
                            <div onClick={async () => {

                            }} className="relative">
                                <img
                                    src={product?.productimage[0]}
                                    alt="Product"
                                    className="w-14 h-14 object-cover rounded"
                                />
                                <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {buyquantity || product.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{product.title}</p>
                                <p className="text-sm mt-1 text-right">₹{product.price * (buyquantity || product.quantity)}.00</p>
                            </div>
                        </div>}
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
                            <span>₹{amount}.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Shipping Charge{" "}
                                <span className="text-gray-400 cursor-help">ⓘ</span>
                            </span>
                            <span className="text-gray-500 font-semibold">{customerAddress ? "Free" : "Enter shipping address"}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between pt-2 border-t mt-2 font-semibold">
                        <span>Total</span>
                        <span>INR ₹{amount}.00</span>
                    </div>
                    {!toggleHandle && <button onClick={() => {
                        if (customerAddress) {
                            handlePayment(amount, customerAddress, createCustomer, editQuantity)
                        } else {
                            confirm("Please fill the address details before proceeding to payment.");
                            navigate(-1)
                        }
                    }}
                        className="w-full bg-black mt-4 text-white rounded-full py-3 text-center hover:bg-gray-900 transition">
                        Pay Now
                    </button>}
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
