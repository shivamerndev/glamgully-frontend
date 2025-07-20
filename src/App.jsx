import React from 'react'
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

const App = () => {
  const location = useLocation()
  const hideNavbar = location.pathname.startsWith("/admin/");
  return (
    <div className={`bg-white text-black ${hideNavbar ? "" : "pt-20"} h-screen w-full`}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/admin/register' element={<Register />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path="/admin/glamgully" element={<AdminProtected><AdminPanel /></AdminProtected>} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/checkout/:productId' element={<CheckoutForm />} />
        <Route path='/checkout/order/:productId' element={<OrderSummary />} />
        <Route path='/category/:productname' element={<CategoryPage />} />
        <Route path='/product/all' element={<CategoryPage />} />
      </Routes>
    </div>
  )
}

export default App
