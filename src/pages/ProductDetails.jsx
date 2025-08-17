import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { FaShieldAlt, FaSmile, FaCoins, FaUndo, FaExchangeAlt, FaRupeeSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ProductDataContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { addCartWithQuantity } from "../utils/local.cart";
import Loader from '../../src/assets/loader.gif';
import CartLoader from "/src/assets/cart.gif"
import axios from "axios";
import RateBox from "../components/Ratebox";


const ProductDetails = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { singleProduct, setlengthc, getProducts } = useContext(ProductDataContext)
    const [p, setp] = useState(null)
    const [rateBox, setrateBox] = useState(false)
    const [resComment, setResComment] = useState(null)
    const [recp, setRecp] = useState(null)
    const [comment, setComment] = useState("")
    const [cartLoad, setCartLoad] = useState(false)
    const [cartbtn, setCartBtn] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [Starquantity, setStarquantity] = useState(0);
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);


    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    useEffect(() => {
        setQuantity(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productId]);

    useEffect(() => {
        singleProduct(productId).then(data => setp(data))
        getComment()
    }, [productId, rateBox]);

    useEffect(() => {
        getProducts().then(data => {
            const filtered = (data?.products.filter(item => item._id !== productId && item.category === p?.category))
            if (filtered?.length === 0) {
                setRecp(data.products.splice(0, 6).filter(item => item._id !== productId))
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
            navigate(`/checkout/${p._id}&${quantity}`);
        } catch (error) {
            console.log(error)
        }
    }
    // comment related functions
    const CommentCreate = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/review/create`, {
                productId,
                text: comment,
                star: Starquantity // Assuming a default star rating of 3, you can modify this as needed
            })
            setComment("")
            setStarquantity(0)
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    const getComment = async () => {
        try {
            const comment = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/all/comments/?productId=${productId}`)
            setResComment(comment.data)
        } catch (error) {
            console.error("Error adding comment:", error);
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

    useEffect(() => {
        if (p?.quantity < quantity) {
            setQuantity(quantity - 1);
            alert('enough quantity reached.')
        }
    }, [quantity])


    return (p && recp ?
        <div className="h-screen text-black w-full  px-3 pb-8">

            {rateBox && <RateBox create={CommentCreate} Starquantity={Starquantity} setStarquantity={setStarquantity} setrateBox={setrateBox} />}

            <>
                <div
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    className="bg-red-200 relative w-full flex h-[45%] mt-4 rounded-md overflow-hidden">
                    <div
                        className="flex w-full h-full transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}>
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
                <div style={{ color: p?.quantity <= 0 && "gray" }} className="w-full mt-2 rounded-lg space-y-3 text-gray-800 font-sans">
                    <p className=" uppercase tracking-widest text-gray-400">GLAMGULLY</p>
                    <h1 className="text-3xl mb-0 font-medium">{p?.title}   </h1>
                    {p?.quantity <= 0 && <span className="text-red-600 text-base font-bold ">out of stock</span>}
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
                            <span className="px-4 py-1">{p?.quantity <= 0 ? 0 :quantity}</span>
                            <button onClick={increment} className="px-3 py-1 text-xl">+</button>
                        </div>
                    </div>
                    <button onClick={addCart} className="w-full flex justify-center items-center border capitalize  text-xl border-black rounded-full py-2 text-center hover:bg-black hover:text-white transition">
                        {cartLoad ? <img className='w-fit h-6' src={CartLoader} alt="loading..." /> : (cartbtn ? "added successfully ✅" : "add to cart")}
                    </button>
                    {<button onClick={() => {
                        if (p?.quantity <= 0) {
                            alert("Product is out of stock")
                        } else {
                            buyNow(p)
                        }
                    }}
                        className={`w-full  ${p?.quantity <= 0 ? "bg-gray-400" : "bg-black"} text-white rounded-full text-xl font-semibold py-2 text-center hover:bg-gray-900 transition`}>
                        Buy it now
                    </button>}

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
                {/* <div className="grid grid-cols-3 text-center items-center borde border-gray-500 font-normal text-base py-4 px-4 ">
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
                </div> */}
            </div>

            <div className="text-black w-full">
                <h1 className="text-2xl my-4">You may also like</h1>
                <div className="flex flex-wrap justify-center bg-amber-40 gap-2 w-full  ">
                    {recp?.map((p, i) => <Card key={i} product={p} />)}
                </div>

                <h1 className="text-2xl font-semibold my-4">Reviews</h1>
                {resComment && resComment.map((c, i) => <div key={i} className="max-w-sm my-4 bg-gray-100 px-4 py-3 rounded-lg shadow flex justify-between items-start">
                    <div className=" space-y-2">
                        <div className="flex space-x-1 ">
                            {[...Array(c.star)].map((_, i) => (
                                <FaStar onClick={() => {
                                    console.log(i + 1, 'sense good.');
                                }} key={i} size={14} className="text-yellow-500" />
                            ))}
                        </div>
                        <p className="text-base text-gray-800">{c.text}</p>
                    </div>
                </div>)}

                <div className="relative">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write something about this product. " className="mb-4 w-full h-12 px-4 pr-10 py-2 border border-t-0 border-r-0 border-gray-300 outline-none rounded-lg transition"
                    ></textarea>
                    {comment.length !== 0 && <p onClick={() => setrateBox(true)} className="bg-blue-400 px-2 text-white rounded-full font-semibold select-none absolute right-2 top-3 text-center ">send</p>}
                </div>
            </div>
        </div> : <div className=" flex justify-center items-center h-10/12 w-full ">
            <img className=" object-contain h-2/4 w-2/5 "
                src={Loader} alt="product loading..." />
        </div>
    );
}
export default ProductDetails;