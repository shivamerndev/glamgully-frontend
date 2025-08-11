import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext';

const AdminNavbar = ({ focus }) => {
    const { LogoutAdmin } = useContext(AdminDataContext)
    const navigate = useNavigate()

    const Linkarr = [{ text: "Dashboard", href: '/admin/glamgully' }, { text: "Products", href: '/admin/glamgully/products' }, { text: "Customers", href: '/admin/glamgully/customers' }]

    return (
        <aside className="w-full lg:w-64 fixed z-10 top-0 lg:static bg-white shadow-md">
            <div className='w-full px-4 pt-4 flex justify-between mb-4'>
                <img onClick={()=>navigate('/')} className='w-10 h-10 rounded-full ' src="https://res.cloudinary.com/dgis42anh/image/upload/v1749317565/logo_ac7mo9.jpg" alt="logo" />
                <img onClick={()=>navigate('/')} className='h-10' src="/public/glam_text-removebg-preview.png" alt="logo" />
                <button onClick={() => {
                    LogoutAdmin().then(res => {
                        if (res.status === 200) {
                            navigate('/admin/login')
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }} className="inline-block cursor-pointer bg-red-500 text-gray-100 py-.5 rounded h-7 text-center px-3 ">Logout</button >
            </div>
            <nav className=" flex pb-2 w-full gap-3 px-3 items-center justify-between">
                {Linkarr.map((l, i) => <Link
                    key={i} to={l.href} className={`inline-block text-center cursor-pointer w-full ${focus === l.text ? "bg-rose-400" : "bg-zinc-800"} rounded-lg text-white `}>{l.text}</Link>)}
            </nav>
        </aside>
    )
}

export default AdminNavbar
