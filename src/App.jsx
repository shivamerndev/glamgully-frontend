import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import Contact from './pages/About.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Navbar from './components/Navbar.jsx'
import AdminPanel from './Admin/AdminPanel.jsx'
import AdminProtected from './Admin/AdminProtected.jsx'
import Register from './Admin/Register.jsx'
import Login from './Admin/Login.jsx'
import CheckoutForm from './pages/CheckoutForm.jsx'
import OrderSummary from './components/OrderSummary.jsx'
import Cart from './components/Cart.jsx'
import { ProductDataContext } from './context/ProductContext.jsx'
import ProductsPage from './Admin/ProductsPage.jsx'
import CustomersPage from './Admin/CustomersPage.jsx'
import OrderContext from './context/OrderContext.jsx'
import OrdersPage from './Admin/OrdersPage.jsx'
import BottomNavbar from './components/BottomNavbar.jsx'
import "@flaticon/flaticon-uicons/css/all/all.css";
import MyOrders from './pages/MyOrders.jsx'
import AllProductsPage from './pages/AllProductsPage.jsx'

const App = () => {
  const { pathname } = useLocation()
  const { setlengthc } = useContext(ProductDataContext)
  const [AllowNav, setAllowNav] = useState(false)

  useEffect(() => {
    const cartlength = JSON.parse(localStorage.getItem("cart"))
    if (cartlength) {
      setlengthc(cartlength?.length)
    } else {
      setlengthc(0)
    }
  }, [])

  // Define routes where navbars should not appear
  const adminRoutes = pathname.startsWith("/admin/")
  const allowedRoutesForTopNav = ["/cart", "/about", "/wishlist", "/orders", "/account", "/product", "/category", "/checkout"]
  const allowedRoutesForBottomNav = ["/cart", "/wishlist", "/orders", "/account"]

  return (
    <div className={`bg-white text-black  font-[Poppins,Tangerine,sans-serif]  md:min-h-screen w-full`}>
      {(allowedRoutesForTopNav.includes(pathname) || AllowNav) && <Navbar />}
      {(allowedRoutesForBottomNav.includes(pathname) || AllowNav) && <BottomNavbar />}

      <Routes>
        <Route path='/admin/register' element={<Register />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path="/admin/glamgully" element={<OrderContext><AdminProtected><AdminPanel /></AdminProtected></OrderContext>} />
        <Route path="/admin/glamgully/orders" element={<OrderContext><AdminProtected><OrdersPage /></AdminProtected></OrderContext>} />
        <Route path="/admin/glamgully/products" element={<AdminProtected><ProductsPage /></AdminProtected>} />
        <Route path="/admin/glamgully/customers" element={<AdminProtected><CustomersPage /></AdminProtected>} />
        <Route path="/" element={<Home setAllowNav={setAllowNav} />} />
        <Route path='/account' element={<Account />} />
        <Route path='/about' element={<Contact />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/checkout/:productId' element={<OrderContext><CheckoutForm /></OrderContext>} />
        <Route path='/checkout/cart' element={<OrderContext><CheckoutForm /></OrderContext>} />
        <Route path='/checkout/order/:productId' element={<OrderContext><OrderSummary /></OrderContext>} />
        <Route path='/checkout/order/cart' element={<OrderContext><OrderSummary /></OrderContext>} />
        <Route path='/category/:productname' element={<AllProductsPage />} />
        <Route path='/product/all' element={<AllProductsPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<MyOrders />} />
      </Routes>
    </div >
  )
}

export default App
