import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { FaShieldAlt, FaSmile, FaCoins, FaUndo, FaExchangeAlt, FaRupeeSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ProductDataContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { addCartWithQuantity } from "../utils/local.cart";
import Loader from '../../src/assets/loader.gif';
import CartLoader from "/src/assets/cart.gif"


const ProductDetails = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { singleProduct, setlengthc, getProducts } = useContext(ProductDataContext)
    const [p, setp] = useState(null)
    const [recp, setRecp] = useState(null)
    const [cartLoad, setCartLoad] = useState(false)
    const [cartbtn, setCartBtn] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productId]);

    useEffect(() => {
        singleProduct(productId).then(data => setp(data))
    }, [productId])

    useEffect(() => {
        getProducts().then(data => {
            const filtered = (data?.filter(item => item._id !== productId && item.category === p?.category))
            if (filtered?.length === 0) {
                setRecp(data.splice(0, 6).filter(item => item._id !== productId))
            } else {
                setRecp(filtered)
            }
        }).catch(err => console.log(err))
    }, [p])

    const addCart = () => {
        addCartWithQuantity(p, quantity)
        setCartLoad(true)
        setTimeout(() => {
            setCartLoad(false)
            setCartBtn(true)
        }, 2000);
        const cart = JSON.parse(localStorage.getItem("cart"))
        setlengthc(cart?.length)
        setTimeout(() => {
            setCartBtn(false)
        }, 4000);
    }

    const buyNow = (p) => {
        try {
            navigate(`/checkout/${p._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    // Handle swipe manually
    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const deltaX = touchStartX.current - touchEndX.current;
        if (deltaX > 50) {
            // swipe left
            setCurrent((prev) => (prev + 1) % p?.productimage?.length);
        } else if (deltaX < -50) {
            // swipe right
            setCurrent((prev) => (prev === 0 ? p?.productimage?.length - 1 : prev - 1));
        }
    };

    console.log(p?.quantity, quantity);


    return (p && recp ?
        <div className="h-screen text-black w-full  px-3 pb-8">
            <>
                <div
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="bg-red-200 relative w-full flex h-[45%] mt-4 rounded-md overflow-hidden"
                >
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {p?.productimage.map((img, idx) => (
                            <div key={img} className="w-full shrink-0 h-full rounded-md overflow-hidden">
                                <img className="h-full w-full object-cover object-top" src={img} alt="pimg" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {current + 1} / {p.productimage.length}
                    </div>
                </div>
                <div className="w-full mt-2  rounded-lg space-y-3 text-gray-800 font-sans">
                    <p className=" uppercase tracking-widest text-gray-400">GLAMGULLY</p>
                    <h1 className="text-3xl font-medium">{p?.title}</h1>
                    <div className="flex items-center space-x-4">
                        <del className="text-gray-400">₹ 499.00</del>
                        <span className="text-lg font-semibold">₹ {p?.price}.00</span>
                        <span className=" bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Sale</span>
                    </div>
                    <p className=" text-gray-500"> {p?.description} </p>
                    <div>
                        <label className="block mb-1 font-medium">Quantity</label>
                        <div className="flex items-center border w-fit rounded overflow-hidden">
                            <button onClick={decrement} className="px-3 py-1 text-xl">−</button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button onClick={increment} className="px-3 py-1 text-xl">+</button>
                        </div>
                    </div>
                    <button onClick={addCart} className="w-full flex justify-center items-center border capitalize  text-xl border-black rounded-full py-2 text-center hover:bg-black hover:text-white transition">
                        {cartLoad ? <img className='w-fit h-6' src={CartLoader} alt="loading..." /> : (cartbtn ? "added successfully ✅" : "add to cart")}
                    </button>
                    <button onClick={() => { buyNow(p) }} className="w-full bg-black text-white rounded-full text-xl font-semibold py-2 text-center hover:bg-gray-900 transition">
                        Buy it now
                    </button>

                    <p className=" text-gray-600 pt-2"></p>
                </div>
            </>

            <div className="bg-cyan-50 text-gray-800 font-[plain] ">
                <div className="grid grid-cols-3 text-center text-base py-4 px-3 ">
                    <div className="space-y-2">
                        <div className="flex justify-center text-2xl">
                            <FaShieldAlt />
                        </div>
                        <p className=" font-medium">Anti Tarnish</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-center text-2xl">
                            <FaSmile />
                        </div>
                        <p className=" font-medium">Skin Friendly</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-center text-2xl">
                            <FaCoins />
                        </div>
                        <p className=" font-medium">18k Gold Tone Plated</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 text-center items-center borde border-gray-500 font-normal text-base py-4 px-4 ">
                    <div className="space-y-1 ">
                        <div className="flex justify-center text-2xl">
                            <FaUndo />
                        </div>
                        <p className="">1 Days Return</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-center text-2xl">
                            <FaExchangeAlt />
                        </div>
                        <p className="">1 Days Exchange</p>
                    </div>
                    {p.price > 499 && <div className="space-y-1">
                        <div className="flex justify-center text-2xl">
                            <FaRupeeSign />
                        </div>
                        <p className="">Cash On Delivery</p>
                    </div>}
                </div>
            </div>

            <div className="text-black w-full">
                <h1 className="text-2xl my-4">You may also like</h1>
                <div className="flex flex-wrap justify-center bg-amber-40 gap-2 w-full  ">
                    {recp?.map((p, i) => <Card key={i} product={p} />)}
                </div>
                <h1 className="text-2xl my-4">Reviews</h1>
                <div className="max-w-sm my-4 bg-gray-100 p-4 rounded-lg shadow flex justify-between items-start">
                    <div className=" space-y-2">
                        <div className="flex space-x-1 text-yellow-500">
                            {[...Array(3)].map((_, i) => (
                                <FaStar key={i} size={14} />
                            ))}
                        </div>
                        <p className="text-sm text-gray-700">I just loved it</p>
                    </div>
                </div>
                <div className="max-w-sm my-4 bg-gray-100 p-4 rounded-lg shadow flex justify-between items-start">
                    <div className=" space-y-2">
                        <div className="flex space-x-1 text-yellow-500">
                            {[...Array(3)].map((_, i) => (
                                <FaStar key={i} size={14} />
                            ))}
                        </div>
                        <p className="text-sm text-gray-700">I just loved it</p>
                    </div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Write something about this product." className="mb-4 w-full px-4 py-2 border border-t-0 border-r-0 border-gray-300 outline-none rounded-lg transition" />
                    {<p className="bg-blue-400 px-2 text-white rounded-full font-semibold select-none absolute right-4 top-2 text-center ">send</p>}
                </div>
            </div>
        </div> : <div className=" flex justify-center items-center h-10/12 w-full ">
            <img className=" object-contain h-2/4 w-2/5 "
                src={Loader} alt="product loading..." />
        </div>
    );
}
export default ProductDetails;