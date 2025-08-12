import { useRef, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoHome, IoHomeOutline } from "react-icons/io5";

const Menubar = ({ setmenu }) => {
  const [current, setCurrent] = useState(0);
  const [hideMenu, setHideMenu] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const handleSwipe = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    // ➡️ swipe left to close
    if (deltaX > 50) {
      setHideMenu(true); // trigger animation
      setTimeout(() => {
        setmenu(false); // hide the menu fully
      }, 300); // match CSS transition
    }
    // ⬅️ Optional swipe right to move in (if needed)
    // else if (deltaX < -50) {
    //   setHideMenu(false);
    // }
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const list = [
    { ic: <IoHome className="text-3xl" />, li: "home" },
    { ic: <BiSolidDetail className="text-3xl" />, li: "about" },
    { ic: <MdContactPhone className="text-3xl" />, li: "contact" },
  ];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed top-20 z-30 h-full w-2/3 bg-white text-zinc-700 text-xl transition-transform duration-300 ease-in-out
        ${hideMenu ? "-translate-x-full" : "translate-x-0"}`}
    >
      {list.map((l, i) => (
        <Link
          to={`/${l.li === "home" ? "" : l.li}`}
          key={i}
          onClick={() => setmenu(false)}
          className="flex px-4 text-lg items-center font-light  border-b border-gray-100">
            <h1 className=" text-base w-8 h-9 font-bol">
          {l.ic}
            </h1>
          <p className="px-4 my-2.5 font-semibold capitalize">{l.li}</p>
        </Link>
      ))}
    </div>
  );
};

export default Menubar;
