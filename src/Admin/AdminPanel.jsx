import React, { useContext, useEffect, useState } from 'react'
import { ProductDataContext } from "../context/ProductContext";
import FormProduct from './FormProduct';
import { Link } from 'react-router-dom';
import { AdminDataContext } from '../context/AdminContext';
import Loader from '../../src/assets/loader.gif';

const AdminPanel = () => {
  const { getProductsAdmin, editProduct } = useContext(ProductDataContext)
  const { LogoutAdmin } = useContext(AdminDataContext)
  const [products, setProducts] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [isActiveState, setIsActiveState] = useState({})


  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setShowModal(false);
    }
  };
  
  useEffect(() => {
    getProductsAdmin().then((data) => {
      setProducts(data.reverse());
    });
  }, [showModal]);



  return (products ?
    <div className="flex flex-col pt-19  lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 fixed top-0 lg:static bg-white p-5 shadow-md">
        <div className='w-full flex justify-between mb-4'>
          <img className='w-10 h-10 rounded-full ' src="https://res.cloudinary.com/dgis42anh/image/upload/v1749317565/logo_ac7mo9.jpg" alt="logo" />
          <img className='h-10' src="/public/glam_text-removebg-preview.png" alt="logo" />
          <Link to={'/admin/login'} onClick={LogoutAdmin} className="inline-block cursor-pointer bg-rose-500 text-gray-100 py- rounded h-7 text-center px-3 ">Logout</Link >
        </div>
        <nav className=" flex lg:flex-col lg:gap-4 font-semibold   items-center w-full justify-center">
          <button className="block cursor-pointer focus:text-blue-500 text-left w-full text-gray-700 hover:text-blue-600">Dashboard</button>
          <button className="block cursor-pointer text-left w-full text-gray-700 hover:text-blue-600">Customers</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 pt-15 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl  font-semibold mb-4">Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-xl font-bold">₹00.00</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        {/* Product Management */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-2 mb-4">
            <h2 className="text-xl md:text-2xl text-center font-semibold">Product Management</h2>
            <button onClick={() => setShowModal(true)} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700">Add New Product</button>
          </div>
          {showModal && <FormProduct EditProduct={showModal} setShowModal={setShowModal} handleBackdropClick={handleBackdropClick} />}
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-left ">
              <thead className="bg-zinc-800 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Stock</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody className="rounded-2xl bg-gray-700 h-[50vh] text-white overflow-hidden">
                {products?.map((p, i) => {
                  return <tr key={i} className={`${p.quantity < 5 && "bg-black"}  rounded-2xl border-b-[1px]`}>
                    <td className="px-4 py-2">{p.title}</td>
                    <td className={`px-4 py-2  ${p.quantity < 5 && "text-red-700 font-bold"}`}>{p.quantity < 10 ? `0${p.quantity}` : p.quantity}</td>
                    <td className="px-4 py-2">₹{p.price}.00</td>
                    <td
                      onClick={() => {
                        // Toggle the isActive state locally
                        setIsActiveState((prev) => {
                          const newState = { ...prev, [p._id]: !(prev[p._id] ?? p.isActive) };
                          // Call editProduct with the toggled value
                          editProduct({ ...p, isActive: !((prev[p._id] ?? p.isActive)) });
                          return newState;
                        });
                      }}
                      className={`px-4 py-2 capitalize cursor-pointer ${((isActiveState[p._id] ?? p.isActive) ? 'text-green-500' : 'text-red-500')}`}>
                      {(isActiveState[p._id] ?? p.isActive) ? "active" : "inactive"}
                    </td>
                    <td onClick={() => setShowModal({ 'edit': p })} className="px-4 py-2 text-yellow-400">Edit</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Customer Management */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Customer Management</h2>
          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Shivam kumar</td>
                  <td className="px-4 py-2">9955422156</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div> : <div className=" flex justify-center items-center h-full  w-full ">
      <img className=" object-contain h-2/4 w-2/5 "
        src={Loader} alt="loading..." />
    </div>
  );
}

export default AdminPanel
