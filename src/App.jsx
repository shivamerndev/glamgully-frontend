import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import Contact from './pages/About.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Navbar from './components/Navbar.jsx'
import AdminPanel from './Admin/AdminPanel.jsx'
import AdminProtected from './Admin/AdminProtected.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AdminLogin from './Admin/AdminLogin.jsx'
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
import { CustomerDataContext } from './context/CustomerContext.jsx'
import Wishlist from './pages/Wishlist.jsx'
import CustomerProtected from './components/templates/CustomerProtected.jsx'
import AccountSettings from './pages/Customs/AccountSettings.jsx'
import TrackOrder from './pages/TrackOrder.jsx'

const App = () => {
  const { pathname } = useLocation()
  const { getprofile, profile } = useContext(CustomerDataContext)
  const { setlengthc, lengthc } = useContext(ProductDataContext)
  const [AllowNav, setAllowNav] = useState(false)

  useEffect(() => {
    getprofile().catch(err => {
      console.log(err.response.data.message);
      const cartlength = JSON.parse(localStorage.getItem("cart"))
      if (cartlength) {
        setlengthc(cartlength?.length)
      } else {
        setlengthc(0)
      }
    })
  }, [])

  useEffect(() => {
    if (lengthc <= 0 && profile) {
      getprofile().catch(err => {
        console.log(err.response.data.message) // don't use setlengthc beacuse infity
      })
    }
  }, [lengthc])

  // Define routes where navbars should not appear
  const adminRoutes = pathname.startsWith("/admin/")
  const allowedRoutesForTopNav = ["/cart", "/about", "/wishlist", "/orders", "/account", "/product", "/category", "/checkout"]
  const allowedRoutesForBottomNav = ["/wishlist","/about", "/orders", "/account"]

  return (
    <div className={`bg-white text-black  font-[Poppins,Tangerine,sans-serif]  md:min-h-screen w-full`}>
      {(allowedRoutesForTopNav.includes(pathname) || AllowNav) && <Navbar />}
      {(allowedRoutesForBottomNav.includes(pathname) || AllowNav) && <BottomNavbar />}

      <Routes>
        {/* <Route path='/admin/register' element={<Register />} /> */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path="/admin/glamgully" element={<OrderContext><AdminProtected><AdminPanel /></AdminProtected></OrderContext>} />
        <Route path="/admin/glamgully/orders" element={<OrderContext><AdminProtected><OrdersPage /></AdminProtected></OrderContext>} />
        <Route path="/admin/glamgully/products" element={<AdminProtected><ProductsPage /></AdminProtected>} />
        <Route path="/admin/glamgully/customers" element={<AdminProtected><CustomersPage /></AdminProtected>} />
        <Route path="/" element={<Home setAllowNav={setAllowNav} />} />
        {/* protectedroute after for state mangement cleanlly without app */}
        <Route path='/account' element={<CustomerProtected><Account /></CustomerProtected>} />
        <Route path='/about' element={<Contact />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/checkout/cart' element={<CustomerProtected><OrderContext><CheckoutForm /></OrderContext></CustomerProtected>} />
        <Route path='/checkout/:productId' element={<CustomerProtected><OrderContext><CheckoutForm /></OrderContext></CustomerProtected>} />
        <Route path='/checkout/order/:productId' element={<CustomerProtected><OrderContext><OrderSummary /></OrderContext></CustomerProtected>} />
        <Route path='/checkout/order/cart' element={<CustomerProtected><OrderContext><OrderSummary /></OrderContext></CustomerProtected>} />
        <Route path='/product/all' element={<AllProductsPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<CustomerProtected><Wishlist /></CustomerProtected>} />
        <Route path='/orders' element={<CustomerProtected><MyOrders /></CustomerProtected>} />
        <Route path='/track/orders/:orderId' element={<CustomerProtected><TrackOrder /></CustomerProtected>} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/user/login' element={<CustomerProtected><Login /></CustomerProtected>} />
        <Route path='/user/settings' element={<CustomerProtected><AccountSettings /></CustomerProtected>} />
      </Routes>
    </div>
  )
}

export default App
