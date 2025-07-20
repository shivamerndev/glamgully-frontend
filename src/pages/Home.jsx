import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";

const Home = () => {
  const { getProducts } = useContext(ProductDataContext)
  const [products, setProducts] = useState(null)
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    localStorage.removeItem("token")
    getProducts().then((data) => {
      if (data) setProducts(data);
    });
  }, []);
  const bannerimg = 'https://images.unsplash.com/photo-1724985974844-146a7076b3b1?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const banners = [
    {
      img: bannerimg,
      title: "Jewellery straight out of your pintrest dreams",
      btn: "Outline"
    },
    {
      img: bannerimg,
      title: "straight pintrest dreams",
      btn: "Learn more"
    },
    {
      img: bannerimg,
      title: " out of your pintrest dreams",
      btn: "Buy now"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="bg-white min-h-screen w-full text-black">
      <div className="bg-[#bb6024c0] w-full py-1 text-base uppercase font-semibold text-white text-center">
        <h1>GET Free shipping above ₹599.00</h1>
      </div>
      <main className="w-full h-full ">
        <div className="flex flex-nowrap overflow-hidden">

          <div className="relative w-full overflow-hidden" style={{ height: "50vh" }}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${banners.length * 100}%`,
                transform: `translateX(-${current * (100 / banners.length)}%)`
              }}>
              {banners.map((banner, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-full h-[50vh] bg-center bg-cover relative"
                  style={{ backgroundImage: `url(${banner.img})` }}>
                  <div className="absolute h-full w-full bg-[#00000094] flex flex-col items-center justify-center text-[21px] text-center font-[tahoma] capitalize font-semibold text-white">
                    <h1>{banner.title}</h1>
                    <button className="border px-4 py-1 rounded-2xl mt-4 font-sans text-white">{banner.btn}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div id="marquee" className="w-full bg-[#b16431b7] flex overflow-hidden text-xl uppercase font-semibold text-white text-center relative h-12">
          <div className="marquee-track flex">
            <span className=" whitespace-nowrap py-2  px-1">Anti tarnish •  waterproof • skin friendly •</span>
            <span className=" whitespace-nowrap py-2  px-1">Anti tarnish •  waterproof •  skin friendly •</span>
          </div>
        </div>

        <div className=" mt-10 px-4">
          <h1 className="text-3xl my-8" >Limited Edition</h1>
          <div id='cards' className="flex overflow-x-auto gap-3 w-full  ">
            {products && products.map((p, i) => <div key={i}> <Card product={p} /></div>)}

          </div>
          <Link to={'/product/all'} className='outline-1 w-full py-2 text-xl outline-gray-900 rounded-3xl capitalize my-8 inline-block text-center'>view all</Link>
        </div>
        <div className=" mt-10 px-4">
          <h1 className="text-3xl my-8" >Best Seller</h1>
          <div id='cards' className="flex overflow-x-auto gap-3 w-full  ">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <Link to={'/product/all'} className='outline-1 w-full py-2 text-xl outline-gray-900 rounded-3xl capitalize my-8 inline-block text-center'>view all</Link>
        </div>
        <div className=" mt-10 px-4 ">
          <h1 className="text-3xl my-8 font-semibold" >Category</h1>
          <div className="grid gap-3 grid-cols-2 w-full ">

            <div className=" mb-2 text-center text-xl font-semibold w-full ">
              <Link to={'/category/products'} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                <img className="w-full h-full object-cover" src="/Walletimg.webp" alt="" />
              </Link>
              <h1>Wallet</h1>
            </div>
            <div className=" mb-2 text-center text-xl font-semibold w-full ">
              <Link to={'/category/products'} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                <img className="w-full h-full object-cover" src="/wallet2.webp" alt="" />
              </Link>
              <h1>Wallet</h1>
            </div>
            <div className=" mb-2 text-center text-xl font-semibold w-full ">
              <Link to={'/category/products'} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                <img className="w-full h-full object-cover" src="/wallet2.webp" alt="" />
              </Link>
              <h1>Wallet</h1>
            </div>
            <div className=" mb-2 text-center text-xl font-semibold w-full ">
              <Link to={'/category/products'} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                <img className="w-full h-full object-cover" src="/Walletimg.webp" alt="" />
              </Link>
              <h1>Wallet</h1>
            </div>

          </div>
          <h1 className="text-3xl my-8 font-semibold ">Customer Reviews</h1>
          <div className="flex gap-2 overflow-x-auto w-full ">
            <div className="w-2/2 overflow-y-auto text-base  h-64 rounded-lg text-black font-semibold  py-2 ">
              <h1>Review texts here...</h1>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
