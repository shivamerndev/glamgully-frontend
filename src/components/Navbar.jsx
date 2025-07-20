import React, { useState } from 'react'
import Menubar from './Menubar';
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { RiMenu2Fill } from "react-icons/ri";

const Navbar = () => {
    const [menu, setmenu] = useState(false);
    const [search, setsearch] = useState(false);
    return (
        <>
            {menu && <Menubar setmenu={setmenu} />}
            <nav className="w-full z-10 fixed bg-white top-0 flex  items-center justify-between py-3 px-4 text-2xl ">
                <RiMenu2Fill onClick={() => setmenu(!menu)} />
                {search && <div className='bg-white absolute left-1/2 -translate-x-1/2'>
                    <input autoFocus type="txt" placeholder='Search' className='outline-none border border-zinc-900 rounded-md px-5 py-1' />
                    <span onClick={() => setsearch(false)} className='absolute right-3 top-1/2 -translate-y-1/2 '>&times;</span>
                    <div className='bg-white absolute left-1/2 -translate-x-1/2 w-full '>
                        {/* <p className='border-b px-4 py-2 text-xl  border-zinc-900'>search result</p>
                        <p className='border-b px-4 py-2 text-xl  border-zinc-900'>search result</p>
                        <p className='border-b px-4 py-2 text-xl  border-zinc-900'>search result</p> */}
                    </div>
                </div>}
                <img className=" mt-4 h-10 ml-6  " src="/glam_text-removebg-preview.png" alt="logo" />
                <div className="flex gap-4">
                    <IoIosSearch onClick={() => setsearch(!search)} />
                    <LuShoppingCart />
                </div>
            </nav>
        </>
    )
}

export default Navbar
