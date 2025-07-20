import React, { useContext, useState } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import { toast, ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"

const Register = () => {
    const { createAdmin } = useContext(AdminDataContext)
    const obj = { profilepic: undefined, username: "", fullname: "", email: "", password: "", phone: "", gender: "male" }
    const [form, setForm] = useState(obj)

    const handleRegister = (e) => {
        e.preventDefault()
        createAdmin(form).then(res => {
            toast.success("Admin Created Successfully 😍")
        })
            .catch(err => toast.error(err))
    }

    return (
        <div className="max-w-md bg-white h-screen mx-auto py-8  shadow-lg rounded-lg px-8">
            <ToastContainer />
            <h1 className='uppercase font-bold w-full py-4   text-blue-700 text-2xl '>signup as Admin</h1>
            <form onSubmit={handleRegister} className="space-y-2 mt-4 ">
                <div>
                    <label className="block text-gray-700 mb-1 border border-dashed py-2 rounded-md text-center " htmlFor="profilepic">Upload Picture (Optional) </label>
                    <input type="file" id="profilepic" className="hidden" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="fullname">Full Name</label>
                    <input required type="text" id="fullname" onChange={(e) => setForm({ ...form, fullname: e.target.value })} value={form.fullname} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
                    <input required type="text" id="username" onChange={(e) => setForm({ ...form, username: e.target.value })} value={form.username} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input required type="email" id="email" onChange={(e) => setForm({ ...form, email: e.target.value })} value={form.email} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                    <input required type="password" id="password" onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="phone">Phone</label>
                    <input required type="number" id="phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} value={form.phone} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1" htmlFor="gender">Gender</label>
                    <select id="gender" onChange={(e) => { setForm({ ...form, gender: e.target.value }) }} value={form.gender} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition-colors font-semibold">
                    Sign Up
                </button>
            </form>
            <div className="mt-2 text-center">
                <span className="text-gray-700">Already have an account? </span>
                <Link to="/admin/login" className="text-blue-600 hover:underline font-semibold">
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Register
