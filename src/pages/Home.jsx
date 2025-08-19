import { useRef, useContext, useEffect, useState } from "react";
import CardHome from "../components/CardHome";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { ProductDataContext } from "../context/ProductContext";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import BannerCarousel from "../components/BannerCarousel";
import { IoChevronForward } from "react-icons/io5";
import { CustomerDataContext } from "../context/CustomerContext";


const Home = () => {
  const { getProducts, bestSellingProducts } = useContext(ProductDataContext)
  const { readReviewsImg } = useContext(CustomerDataContext)
  const [products, setProducts] = useState(null)
  const [best, setBest] = useState(null)
  const [current, setcurrent] = useState(0)
  const cardsRef = useRef(null);
  const bestRef = useRef(null);
  const [arrowVisible, setArrowVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [reviewImg, setreviewImg] = useState(null)

  const categories = [...new Set(products?.map(p => p.category.trim()))]

  useEffect(() => {
    getProducts().then((data) => {
      if (data) setProducts(data.products);
    });
    bestSellingProducts().then((data) => {
      if (data) setBest(data)
    });
  }, []);


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
  }, [])

  const [scaled, setScaled] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setScaled(true), 100); // slight delay for effect
    return () => clearTimeout(timeout);
  }, [])

  useEffect(() => {
    readReviewsImg().then(res => setreviewImg(res))
  }, [])


  return (products ?
    <div className="bg-white min-h-screen w-full text-black">
      <div id="offer" className="bg[#de6c21c0] w-full py-1 text-base uppercase font-semibold text-white text-center">
        <h1 id="offertext" >GET Free shipping above ₹499.00 😍</h1>
      </div>
      <main className="w-full h-full ">
        <BannerCarousel />
        <div id="marquee" className="w-full flex overflow-hidden text-xl uppercase font-semibold text-white text-center relative h-12">
          <div className="marquee-track flex">
            <span className=" whitespace-nowrap py-2  px-1">Anti tarnish •  waterproof • skin friendly •</span>
            <span className=" whitespace-nowrap py-2  px-1">Anti tarnish •  waterproof •  skin friendly •</span>
          </div>
        </div>

        <div className=" mt-10 px-4">
          <h1 className="text-3xl my-6" >Limited Edition</h1>
          <div
            id="cards"
            ref={cardsRef}
            className="flex overflow-x-auto gap-3 relative w-full scroll-smooth">
            {products?.map((p, i) => (
              <div key={i}>
                <Card product={p} />
              </div>
            ))}

            {arrowVisible && (
              <div className="bg-[#ecececdd] z-1 rounded-full sticky h-fit p-2 top-1/4 right-0 cursor-pointer shadow-md">
                <IoChevronForward
                  onClick={() => {
                    if (cardsRef.current) {
                      cardsRef.current.scrollBy({ left: 300, behavior: "smooth" });
                    }
                    setArrowVisible(false);
                  }}
                  size={30}
                />
              </div>
            )}
          </div>

          <Link to={'/product/all'} className='outline-1 w-full py-2 text-xl outline-gray-900 rounded-3xl capitalize my-8 inline-block text-center'>view all</Link>
        </div>
        <div className=" mt-5 px-4">
          <h1 className="text-3xl my-5" >Best Seller</h1>
          <div ref={bestRef} id='cards' className="flex relative overflow-x-auto gap-3 w-full  ">
            {best && best?.map((p, i) => <div key={i}> <Card product={p} /></div>)}
            {arrowVisible && (<div className="bg-[#ecececdd] z-1 rounded-full sticky h-fit p-2 top-1/4 right-0 justify-between">
              <IoChevronForward onClick={() => {
                if (bestRef.current) {
                  bestRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
                setArrowVisible(false);
              }} size={30} />
            </div>)}
          </div>
          <Link to={'/product/all'} className='outline-1 w-full py-2 text-xl outline-gray-900 rounded-3xl capitalize my-8 inline-block text-center'>view all</Link>
        </div>
        <div className=" px-4 ">
          <h1 className="text-3xl my-5 " >Category</h1>
          <div className="grid gap-3 grid-cols-2 w-full ">

            {categories.map((c, i) => {
              const fp = products.filter(p => p.category === c)
              if (fp.length < 1) {
                return null; // Skip rendering if no products found for this category
              }
              return <div key={i} className=" mb-2 text-center text-xl font-semibold w-full ">
                <Link to={`/category/${c}`} className=" inline-block overflow-hidden bg-gray-800 h-50 w-full  rounded-md text-white font-semibold  ">
                  <img className="w-full h-full object-cover object-center" src={fp[0].productimage[0]} alt="manually adding picture" />
                </Link>
                <h1 className="font-[PP] backdrop-blur-xs text-shadow-2xs font-light text-2xl">{c}</h1>
              </div>
            })}

          </div>

          {reviewImg.length > 0 && <>
            <h1 className="text-3xl mt-6 font-semibold text-gray-800">
              Customer Reviews
            </h1>
            <div className="flex gap-4  items-center overflow-x-auto  h-[60vw] relative">
              {reviewImg && reviewImg?.map((r, i) => (
                <div
                  onClick={() => setActiveIndex(i)}
                  key={i}
                  className={`
            w-[30vw] h-[40vw] rounded-xl shadow-md flex-shrink-0 cursor-pointer 
            transition-all duration-100 ease-in-out
            ${activeIndex === i
                      ? "-translate-y-6 scale-120 shadow-xl"   // active state
                      : "translate-y-0 scale-100"}`}>
                  <img
                    src={r.reviewpicture}
                    alt="Customer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
            </>}
        </div>

      </main>
    </div>
    : <div className=" h-full w-full overflow-hidden  ">
      <div className="h-10/13 w-full">
        {<img className={`h-full w-full object-contain transition-transform duration-1000 ease-in-out ${scaled ? 'scale-150' : 'scale-100'}`}
          src="https://res.cloudinary.com/dgis42anh/image/upload/v1755582685/Screenshot_2025-05-25_205010_zsb3ed.png" alt="" />}
      </div>
      <div className="h-40 w-full flex justify-center items-center absolute overflow-hidden bottom-4">
        <img className="h-full" src="/homeWaiting.webp" alt="loading..." />
      </div>
    </div>
  );
};

export default Home;
