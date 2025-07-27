import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../utils/local.cart'
import { ProductDataContext } from '../context/ProductContext';

const Card = ({ r = "full", img, product }) => {
    const navigate = useNavigate();
    const [cartbtn, setCartBtn] = useState(false)
    const { setlengthc } = useContext(ProductDataContext)

    const addCart = () => {
        addToCart(product)
        setCartBtn(true)
        const cart = JSON.parse(localStorage.getItem("cart"))
        setlengthc(cart?.length)
        setTimeout(() => {
            setCartBtn(false)
        }, 2000);
    }

    return (
        <div className='py-2 w[48%] w-fit rounded shrink-0'>
            <div onClick={() => navigate(`/product/${product?._id}`)} className={` w-45 h-45 bg-red-100 overflow-hidden rounded-${r}`}>
                <img src={product?.productimage || img || "https://plus.unsplash.com/premium_photo-1674498704099-bdd05f6fc274?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="pimg" />
            </div>
            <div onClick={() => navigate(`/product/${product?._id}`)} className="my-3 mx-2 w-full capitalize ">
                <h1>{product?.title}</h1>
                <h1>₹ {product?.price}.00</h1>
            </div>
            <button onClick={addCart} className='outline-1 w-full py-1 text-xl outline-gray-500 capitalize rounded-3xl'>{cartbtn ? "added ✅" : "add to cart"}</button>
        </div>
    )
}

export default Card
