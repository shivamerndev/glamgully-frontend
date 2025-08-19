import { useEffect, useState, useRef } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";


const BannerCarousel = () => {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const banners = [
        {
            img: " https://plus.unsplash.com/premium_photo-1674498704099-bdd05f6fc274?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: " GlamGully - Where Elegance Meets You."
        },
        {
            img: "https://res.cloudinary.com/dgis42anh/image/upload/v1755582685/Screenshot_2025-05-25_205010_zsb3ed.png",
            title: "Jewelry that tells your story - GlamGully"
        },
        {
            img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Elegance in every piece of jewelry"
        }
    ];

    // Auto slide every 3s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
            // swipe left
            setCurrent((prev) => (prev + 1) % banners.length);
        } else if (deltaX < -50) {
            // swipe right
            setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
        }
    };




    return (
        <div className="overflow-hidden relative w-full h-[50vh] bg-red-00"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd} >

            <div className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }} >
                {banners.map((banner, i) => (
                    <a href="/product/all" key={i} className="w-full flex-shrink-0 h-full relative">
                        <div className="w-full h-full bg-black">
                            <img src={banner.img} alt={banner.title}
                                className="w-full h-full object-cover object-center opacity-40" />
                        </div>
                        <h1 className="absolute font-[Tangerine,Poppins,sans-serif] backdrop-blur-xs  capitalize transition-opacity duration-700 ease-in-out text-yellow-100 leading-none text-[10vw] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full"
                            style={{
                                textShadow: "rgb(0 0 0 / 80%) 5px 4px 4px"
                            }}>
                            {banner.title}
                        </h1>
                    </a>
                ))}
            </div>
            <h1 onClick={() => { setCurrent(prev => prev + 100) }} className="absolute hidden md:block left-3 p-1 text-xl text-gray-800 font-semibold rounded-full z-10 bg-[#ffffff5c] top-[40%]"><MdArrowLeft /></h1>
            <h1 onClick={() => { setCurrent(prev => prev - 100) }} className="absolute hidden md:block right-3 p-1 text-xl text-gray-800 font-semibold rounded-full bg-[#ffffff5c] top-[40%]"><MdArrowRight /></h1>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-gray-500"}`} />))}
            </div>
        </div>
    )
};
export default BannerCarousel;
