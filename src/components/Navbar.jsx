import { useContext, useEffect, useRef, useState } from 'react'
import Menubar from './Menubar';
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { ProductDataContext } from '../context/ProductContext';
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const [menu, setmenu] = useState(false);
    const [search, setsearch] = useState(false);
    const searchRef = useRef(null);
    const [stext, setStext] = useState("")
    const [suggest, setSuggest] = useState(null)
    const { searchProduct, lengthc } = useContext(ProductDataContext)

    useEffect(() => {
        const delay = setTimeout(() => {
            if (stext !== "") {
                searchProduct(stext)
                    .then(res => setSuggest(res))
                    .catch(err => console.log(err));
            } else {
                setSuggest(null);
            }
        }, 500); // 500ms delay

        return () => clearTimeout(delay); // cleanup old timeout
    }, [stext]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setsearch(false);
            }
        };
        if (search) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [search]);



    return (
        <>
            {menu && <Menubar setmenu={setmenu} />}
            <nav className="w-full z-10 fixed bg-white top-0 flex  items-center justify-between py-3 px-4 text-2xl ">
                {!menu && <RiMenu2Fill onClick={() => setmenu(true)} />}
                {menu && <RxCross1 onClick={() => setmenu(false)} />}
                {search && <div ref={searchRef} className='  absolute font-semibold left-[15%] h-full content-center z-50'>
                    <input id='search' value={stext} onChange={(e) => setStext(e.target.value)} autoFocus type="txt" placeholder='Search'
                        className='outline-none text-xl font-normal bg-white border w-[70vw] border-zinc-900 rounded-md px-3 py-1 mt-1' />
                    <span onClick={() => {
                        if (stext.trim() !== "") {
                            setStext("")
                        } else {
                            setsearch(false)
                        }
                    }} className='absolute right-3 top-1/2 mt-1 -translate-y-1/2 '>&times;</span>
                    <div className='bg-white max-h-[40vh] overflow-auto rounded text-lg absolute left-1/2 -translate-x-1/2 w-full '>
                        {suggest && suggest.map((t, i) => <Link to={`/product/${t._id}`} onClick={() => {
                            setsearch(false)
                        }} key={i} className='border-b-[1px] pl-3 py-1  block text-gray-700 border-gray-300'>{t?.title}</Link >)}
                    </div>
                </div>}
                <a href="/">
                    <img className=" mt-4 h-10 ml-6  " src="/glam_text-removebg-preview.png" alt="logo" />
                </a>
                <div className="flex gap-4 ">
                    {!search && <IoIosSearch onClick={() => setsearch(!search)} />}
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
