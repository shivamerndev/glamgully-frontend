import { useEffect, useState, useRef } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BannerCarousel = () => {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const navigate = useNavigate();

    const banners = [
        {
            type: "custom", // 👈 ye hai new left+right banner
            title: "New Collection",
            desc: "Jewelry that tells your story - GlamGully",
            btn: "Shop Now",
            img: "https://plus.unsplash.com/premium_photo-1674498704099-bdd05f6fc274?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0",// apna image yaha lagao
        },
        {
            type: "custom", // 👈 ye hai new left+right banner
            title: "New Collection",
            desc: "GlamGully - Where Elegance Meets You.",
            btn: "Shop Now",
            img: "https://res.cloudinary.com/dgis42anh/image/upload/v1755582685/Screenshot_2025-05-25_205010_zsb3ed.png",// apna image yaha lagao
        },
        {
            type: "custom", // 👈 ye hai new left+right banner
            title: "New Collection",
            desc: "Elegance in every piece of jewelry",
            btn: "Shop Now",
            img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0",// apna image yaha lagao
        },
    ];

    // Auto slide every 3s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => {
            clearInterval(interval)
        };
    }, [banners.length]);

    // Handle swipe manually
    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        const deltaX = touchStartX.current - touchEndX.current;
        if (deltaX > 50) {
            setCurrent((prev) => (prev + 1) % banners.length);
        } else if (deltaX < -50) {
            setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
        }
    };

    return (
        <div className="sm:overflow-hidden relative w-[95vw] md:mt-8  mx-auto h-[30vh] sm:h-[35vh] md:h-[70vh] lg:h-[80vh] "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>

            <div className="flex h-[90%] w-full   transition-transform duration-700   ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}>
                {banners.map((banner, i) => <div key={i}
                    className="w-full shrink-0 h-full md:mt-4 rounded-md md:rounded-2xl  bg-[#f5f0eb] flex items-center justify-between">
                    <div className="flex-1  pl-4 md:pl-16">
                        <h2 className="sm:text-xl  text-base font-bold md:text-3xl text-gray-800 mb-2">
                            {banner.title}
                        </h2>
                        <p className="text-gray-600 mb-1 sm:mb-4 sm:text-xl  text-sm">{banner.desc}</p>
                        <button onClick={() => navigate('/product/all')} className="bg-amber-950 cursor-pointer hover:bg-amber-800  md:mt-8 text-white px-2 sm:text-base text-sm sm:py-1.5 py-0.5 sm:px-4 sm:rounded-lg rounded-md shadow-md transition">
                            {banner.btn}
                        </button>
                    </div>
                    <div className="flex-1  rounded-xl md:rounded-sm  overflow-hidden h-full flex justify-end">
                        <img src={banner.img} alt="New Collection" className=" object-cover object-center md:object-center w-full h-full" />
                    </div>
                </div>
                )}
            </div>

            <h1
                onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
                className="absolute hidden md:block right-2 text-4xl text-gray-800 font-semibold rounded-full bg-[#ffffff5c] top-2/5">
                <MdArrowRight />
            </h1>
            <h1 onClick={() => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))}
                className="absolute hidden md:block left-2 text-4xl text-gray-700 font-semibold rounded-full  bg-[#8f8e8e7c] top-2/5">
                <MdArrowLeft />
            </h1>

            {/* Dots */}
            <div className="absolute sm:bottom-0 -bottom-2 bg-red-5 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, i) => <div key={i} className={`w-3 h-3 rounded-full ${i === current ? "bg-gray-400" : "bg-gray-200"}`} />)}
            </div>
        </div>
    );
};

export default BannerCarousel;
