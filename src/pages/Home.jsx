import BannerCarousel from "../components/BannerCarousel";
import CategoryPanel from "../components/CategoryPanel";
import FlashSale from "../components/FlashSale";
import CustomersReviews from "../components/CustomersReviews";
import { useContext, useEffect, useState } from "react";
import { ProductDataContext } from "../context/ProductContext";
import HomePageLoading from "./HomePageLoading";
import Marquee from "../components/Marquee";

const Home = ({ setAllowNav }) => {
  const { getProducts } = useContext(ProductDataContext)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getProducts().then((data) => {
      if (data) {
        setProducts(data.products)
        setAllowNav(true)
      }
    });
    return () => {
      setAllowNav(false)
    }
  }, [])

  return (products ?
    <div className="bg-gradient-to-br from-indigo-50 to-amber-50 min-h-screen relative overflow-x-hidden w-full text-black">
      <main className="w-full  h-full ">
        <BannerCarousel />
        <Marquee />
        <CategoryPanel />
        <FlashSale allProduct={products} />
      </main>
      <footer>
        <CustomersReviews />
      </footer>
    </div>
     : <HomePageLoading />
  );
};

export default Home;
