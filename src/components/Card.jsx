import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../utils/local.cart'
import { ProductDataContext } from '../context/ProductContext';
import CartLoader from "/src/assets/cart.gif"

const Card = ({ r = "full", img, product }) => {
    const navigate = useNavigate();
    const [cartbtn, setCartBtn] = useState(false)
    const [cartLoad, setCartLoad] = useState(false)
    const { setlengthc } = useContext(ProductDataContext)

    const addCart = () => {
        addToCart(product)
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

    return <div className={`py-2 w-[45vw]  hover:scale-90 transition-all flex flex-col items-center ease-in-out rounded`}>
        <div onClick={() => navigate(`/product/${product?._id}`)} className={` w-40 h-40 bg-red-100 overflow-hidden rounded-${r}`}>
            <img className='h-full w-full object-cover object-center' src={product?.productimage[0] || img || "/public/default.png"} alt="product image" />
        </div>
        <div onClick={() => navigate(`/product/${product?._id}`)} className="my-3 mx-2 w-full text-start px-2 capitalize ">
            {/* <h1 className='whitespace-nowrap' >{product?.title.length < 25 ? product.title : product.title.slice(0, 20) + "..."}</h1> */}
            <h1 className='whitespace-nowrap truncate' >{product.title}</h1>
            <h1>₹ {product?.price}.00</h1>
        </div>
        <button onClick={addCart} className='outline-1 flex justify-center items-center gap-4 w-10/11 py-1 text-xl outline-gray-500 capitalize rounded-3xl'>
            {cartLoad ? <img className='w-fit h-6' src={CartLoader} alt="loading..." /> : (cartbtn ? "added" : "add to cart")}
        </button>
    </div >

}

export default Card
