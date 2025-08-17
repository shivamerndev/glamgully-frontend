import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Navbar from './components/Navbar.jsx'
import AdminPanel from './Admin/AdminPanel.jsx'
import AdminProtected from './Admin/AdminProtected.jsx'
import Register from './Admin/Register.jsx'
import Login from './Admin/Login.jsx'
import Logout from './Admin/Logout.jsx'
import CheckoutForm from './pages/CheckoutForm.jsx'
import OrderSummary from './components/OrderSummary.jsx'
import Cart from './components/Cart.jsx'
import { ProductDataContext } from './context/ProductContext.jsx'
import ProductsPage from './Admin/ProductsPage.jsx'
import CustomersPage from './Admin/CustomersPage.jsx'
import OrderContext from './context/OrderContext.jsx'
import OrdersPage from './Admin/OrdersPage.jsx'

const App = () => {
  const location = useLocation()
  const hideNavbar = location.pathname.startsWith("/admin/");
  const { lengthc, setlengthc } = useContext(ProductDataContext)

  useEffect(() => {
    const cartlength = JSON.parse(localStorage.getItem("cart"))
    if (cartlength) {
      setlengthc(cartlength?.length)
    } else {
      setlengthc(0)
    }
  }, [])


  return (
    <div className={`bg-white text-black ${hideNavbar ? "" : "pt-20"} font-[Poppins,Tangerine,sans-serif] h-screen w-full`}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/admin/register' element={<Register />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path="/admin/glamgully" element={<OrderContext><AdminProtected><AdminPanel /></AdminProtected></OrderContext>} />
        <Route path="/admin/glamgully/orders" element={<OrderContext><AdminProtected><OrdersPage /></AdminProtected></OrderContext>} />
      <Route path="/admin/glamgully/products" element={<AdminProtected><ProductsPage /></AdminProtected>} />
      <Route path="/admin/glamgully/customers" element={<AdminProtected><CustomersPage /></AdminProtected>} />
      <Route path="/" element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/product/:productId' element={<ProductDetails />} />
      <Route path='/checkout/:productId' element={<OrderContext><CheckoutForm /></OrderContext>} />
      <Route path='/checkout/cart' element={<OrderContext><CheckoutForm /></OrderContext>} />
      <Route path='/checkout/order/:productId' element={<OrderContext><OrderSummary /></OrderContext>} />
      <Route path='/checkout/order/cart' element={<OrderContext><OrderSummary /></OrderContext>} />
      <Route path='/category/:productname' element={<CategoryPage />} />
      <Route path='/product/all' element={<CategoryPage />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </div >
  )
}

export default App
