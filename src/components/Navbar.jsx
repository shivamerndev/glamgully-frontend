import React, { useContext, useEffect, useState } from 'react'
import Menubar from './Menubar';
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { ProductDataContext } from '../context/ProductContext';
import { addToCart, getCart } from '../utils/local.cart';


const Navbar = () => {
    const [menu, setmenu] = useState(false);
    const [search, setsearch] = useState(false);
    const [stext, setStext] = useState("")
    const [suggest, setSuggest] = useState(null)
    const navigate = useNavigate()
    const { searchProduct, lengthc } = useContext(ProductDataContext)



    useEffect(() => {
        if (stext !== "") searchProduct(stext)
            .then(res => setSuggest(res))
            .catch(err => console.log(err))
    }, [stext])

    // console.log(lengthc)
    
    return (
        <>
            {menu && <Menubar setmenu={setmenu} />}
            <nav className="w-full z-10 fixed bg-white top-0 flex  items-center justify-between py-3 px-4 text-2xl ">
                <RiMenu2Fill onClick={() => setmenu(!menu)} />
                {search && <div className='bg-white absolute left-1/2 -translate-x-1/2'>
                    <input value={stext} onChange={(e) => setStext(e.target.value)} autoFocus type="txt" placeholder='Search' className='outline-none border border-zinc-900 rounded-md px-5 py-1' />
                    <span onClick={() => setStext("")} className='absolute right-3 top-1/2 -translate-y-1/2 '>&times;</span>
                    <div className='bg-white absolute left-1/2 -translate-x-1/2 w-full '>
                        {suggest && suggest.map((t, i) => <Link to={`/product/${t._id}`} onClick={() => {
                            setsearch(false)
                        }} key={i} className='border-b px-4 py-2 text-xl block  border-zinc-900'>{t?.title}</Link >)}
                    </div>
                </div>}
                <img className=" mt-4 h-10 ml-6  " src="/glam_text-removebg-preview.png" alt="logo" />
                <div className="flex gap-4 ">
                    <IoIosSearch onClick={() => setsearch(!search)} />
                    <Link to={('/cart')} className='relative'>
                        <LuShoppingCart />
                        {lengthc > 0 && <h1 className='bg-black text-white -top-2 -right-3 text-xs px-1.5  rounded-full absolute'>{lengthc}</h1>}
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
