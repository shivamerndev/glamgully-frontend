import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext'

const Login = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { LoginAdmin } = useContext(AdminDataContext)
  const [form, setForm] = useState({ username: "", password: "" })
  useEffect(() => { token && navigate('/admin/glamgully') }, [token])
  const handleLogin = (e) => {
    e.preventDefault()
    LoginAdmin(form).then(res => {
      toast.success(res.message)
      localStorage.setItem("token", res.token)
      setTimeout(() => {
        navigate("/admin/glamgully")
      }, 3000);
    })
      .catch(err => toast.error("Wrong username or password"))
  }

  return (
    <div className="max-w-md bg-white h-screen mx-auto py-8  shadow-lg rounded-lg px-8">
      <ToastContainer />
      <h1 className='uppercase font-bold w-full py-4   text-blue-700 text-2xl '>Login as Admin</h1>
      <form onSubmit={handleLogin} className="space-y-2 mt-4 ">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
          <input required type="text" id="username" onChange={(e) => setForm({ ...form, username: e.target.value })} value={form.username} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
          <input required type="password" id="password" onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition-colors font-semibold">
          Login
        </button>
      </form>
      <div className="mt-2 text-center">
        <span className="text-gray-700">Don't have an account? </span>
        <Link to="/admin/register" className="text-blue-600 hover:underline font-semibold">
          Signup
        </Link>
      </div>
    </div>
  )
}

export default Login
