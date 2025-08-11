import { useContext, useEffect, useState } from 'react'
import { ProductDataContext } from "../context/ProductContext";
import FormProduct from './FormProduct';
import Loader from '../../src/assets/loader.gif';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { CustomerDataContext } from '../context/CustomerContext'

const AdminPanel = () => {
  const { allCustomers } = useContext(CustomerDataContext)
  const [customer, setCustomer] = useState([])
  const { getProductsAdmin, editProduct } = useContext(ProductDataContext)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isActiveState, setIsActiveState] = useState({})


  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setShowModal(false);
    }
  };

  useEffect(() => {
    getProductsAdmin().then((data) => {
      setProducts(data);
    })
    return () => {
      setProducts([])
    }
  }, [showModal]);

  useEffect(() => {
    allCustomers().then(res => {
      setCustomer(res)
    }).catch(err => {
      console.log(err);
      setCustomer([])
    })
  }, [])

  return (products ?
    <div className="flex flex-col pt-19  lg:flex-row h-screen bg-gray-100">
      <AdminNavbar focus={'Dashboard'} />
      {/* Main content */}
      <main className="flex-1  pt-15 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl  font-semibold px-4 mb-2">Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 p-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        <section className="mb-8 px-2">
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-2 mb-4">
            <h2 className="text-xl md:text-2xl text-center font-semibold">Product Management</h2>
            <button onClick={() => setShowModal(true)} className="bg-sky-500  cursor-pointer text-white px-3 py-2 rounded hover:bg-blue-700">Add New Product</button>
          </div>
          {showModal && <FormProduct EditProduct={showModal} setShowModal={setShowModal} handleBackdropClick={handleBackdropClick} />}
          <div className="overflow-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-center border-collapse">
              <thead className="bg-zinc-800 text-white text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-1 py-3">Products</th>
                  <th className="px-1 py-3">Qty</th>
                  <th className="px-1 py-3">Price</th>
                  <th className="px-1 py-3">Status</th>
                  <th className="px-1 py-3">Edit</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {products?.slice(0, 5).map((p, i) => (
                  <tr
                    key={i}
                    className={`
            border-b hover:bg-gray-100 transition-colors
            ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            ${p.quantity <= 5 ? "bg-red-50" : ""}
          `}
                  >
                    <td className="px-2 py-3 font-medium text-gray-700">{p.title}</td>
                    <td
                      className={`px-2 py-3 font-semibold ${p.quantity <= 5 ? "text-red-600" : "text-gray-600"
                        }`}
                    >
                      {p.quantity < 10 ? `0${p.quantity}` : p.quantity}
                    </td>
                    <td className="px-2 py-3 text-gray-700">₹{p.price}.00</td>
                    <td
                      onClick={() => {
                        setIsActiveState((prev) => {
                          const newState = {
                            ...prev,
                            [p._id]: !(prev[p._id] ?? p.isActive),
                          };
                          editProduct({
                            ...p,
                            isActive: !(prev[p._id] ?? p.isActive),
                          });
                          return newState;
                        });
                      }}
                      className="px-2 py-3 cursor-pointer"
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${(isActiveState[p._id] ?? p.isActive)
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {(isActiveState[p._id] ?? p.isActive) ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td
                      onClick={() => setShowModal({ edit: p })}
                      className="px-2 py-3 text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
                    >
                      ✏️ Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length > 5 && <button onClick={() => navigate('/admin/glamgully/products')} className="inline-block mt-4 cursor-pointer bg-sky-500 text-gray-100 rounded h-7 text-center px-3 ">view all</button>}
        </section>

        {/* Customer Management */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold px-4 mb-4">Customer Management</h2>
          {customer.length > 0 ? <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {customer && customer?.slice(0, 5).map((c, i) => <tr key={i}>
                  <td className="px-4 py-2">{c.fullname}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                </tr>)}
              </tbody>
            </table>
            {customer.length > 5 && <button onClick={() => navigate('/admin/glamgully/customers')} className="inline-block my-4 mx-4 cursor-pointer bg-sky-500 text-gray-100 rounded h-7 text-center px-3 ">view all</button>}
          </div> : <h1 className='w-full text-center pb-5 text-red-500 font-semibold'>No Customers </h1>}
        </section>
      </main>
    </div> : <div className=" flex justify-center items-center h-full  w-full ">
      <img className=" object-contain h-2/4 w-2/5 "
        src={Loader} alt="loading..." />
    </div>
  );
}

export default AdminPanel
