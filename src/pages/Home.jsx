import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";


const Home = () => {
  const { getProducts } = useContext(ProductDataContext)
  const [products, setProducts] = useState(null)
  const [current, setcurrent] = useState(0)
  const categories = [...new Set(products?.map(p => p.category))]

  useEffect(() => {
    localStorage.removeItem("token")
    getProducts().then((data) => {
      if (data) setProducts(data);
    });
  }, []);
  const bannerimg = 'https://images.unsplash.com/photo-1724985974844-146a7076b3b1?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const bannerimg2 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const bannerimg3 = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const banners = [
    {
      img: bannerimg,
      title: "Jewellery straight out of your pintrest dreams",
      btn: "Outline"
    },
    {
      img: bannerimg2,
      title: "straight pintrest dreams",
      btn: "Learn more"
    },
    {
      img: bannerimg3,
      title: " out of your pintrest dreams",
      btn: "Buy now"
    }
  ];

  useEffect(() => {
    if (current < -200) {
      setcurrent(0)
    }
    else if (current > 0) {
      setcurrent(-200)
    }
  }, [current])

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setcurrent(prev => prev - 100)
    }, 3000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const [scaled, setScaled] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setScaled(true), 100); // slight delay for effect
    return () => clearTimeout(timeout);
  }, []);

  return (products ?
    <div className="bg-white min-h-screen w-full text-black">
      <div className="bg-[#bb6024c0] w-full py-1 text-base uppercase font-semibold text-white text-center">
        <h1>GET Free shipping above ₹599.00</h1>
      </div>
      <main className="w-full h-full ">

        <div className="relative flex flex-nowrap w-full h-[50vh] overflow-hidden">
          <h1 onClick={() => { setcurrent(prev => prev + 100) }} className="absolute left-3 p-1 text-xl text-gray-800 font-semibold rounded-full z-10 bg-[#ffffff5c] top-[40%]"><MdArrowLeft /></h1>
          {banners.map((e, i) => {
            return <div key={i} style={{ translate: current + '%' }} className="bg-black transition-all duration-300 ease-in-out  h-full w-full relative shrink-0">
              <img className="h-full  shrink-0 w-full object-cover object-center opacity-50" src={e.img} alt="" />
              <h1 className="text-white text-xl absolute px-12  top-[40%] text-center text-shadow-black w-full z-10 capitalize font-semibold backdrop:bg-black ">{e.title}</h1>
              {/* <h1  className="text-white text-xl absolute px-5 py-1 rounded-2xl left-[40%]  top-[50%] outline  text-center text-shadow-black w-fit z-10 capitalize font-semibold backdrop:bg-black ">{e.btn}</h1> */}
            </div>
          })}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all  duration-300 ${current / -100 === idx ? 'bg-white p-[5px]' : 'bg-gray-400 opacity-60'}`}
                style={{ display: 'inline-block' }}
              ></span>
            ))}
          </div>
          <h1 onClick={() => { setcurrent(prev => prev - 100) }} className="absolute right-3 p-1 text-xl text-gray-800 font-semibold rounded-full bg-[#ffffff5c] top-[40%]"><MdArrowRight /></h1>

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

            {categories.map((c, i) => {
              const fp = products.filter(p => p.category === c)
              // console.log(fp)
              return <div key={i} className=" mb-2 text-center text-xl font-semibold w-full ">
                <Link to={'/category/products'} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                  <img className="w-full h-full object-cover" src={'/wallet2.webp'} alt="manually adding picture" />
                </Link>
                <h1>{c}</h1>
              </div>
            })}

          </div>
          <h1 className="text-3xl my-8 font-semibold ">Customer Reviews</h1>
          <div className="flex gap-2 overflow-x-auto w-full ">
            <div className="w-2/2 overflow-y-auto text-base  h-64 rounded-lg text-black font-semibold  py-2 ">
              <h1>Review texts here...</h1>
            </div>
          </div>
        </div>

      </main>
    </div> : <div className="bg-red-00 h-full w-full overflow-hidden  ">
      <div className="h-10/13 w-full bg-gray-0">
        {<img className={`h-full w-full object-contain transition-transform duration-1000 ease-in-out ${scaled ? 'scale-150' : 'scale-100'}`}
          src="https://res.cloudinary.com/dgis42anh/image/upload/v1749317565/logo_ac7mo9.jpg" alt="" />}
      </div>/
      <h1 className="text-3xl  font-bold text-zinc-800 text-center uppercase "> please wait...</h1>
    </div>
  );
};

export default Home;
