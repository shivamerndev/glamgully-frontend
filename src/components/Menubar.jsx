import React from "react";
import { IoMdHome } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidDetail } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { Link } from "react-router-dom";


const Menubar = ({ setmenu }) => {
  const list = [
    { ic: <IoMdHome className="text-3xl" />, li: "home" },
    { ic: <AiFillProduct className="text-3xl" />, li: "product" },
    { ic: <BiSolidDetail className="text-3xl" />, li: "about" },
    { ic: <MdContactPhone className="text-3xl" />, li: "contact" },
  ];
  return (
    <div className="text-white w-full  h-full top-20  text-xl fixed z-20 bg-white">
      {list.map((l, i) => (
        <Link to={`/${l.li == 'home' ? "" : l.li}`} key={i} onClick={() => setmenu(false)} className="flex border- border-gray-500 text-zinc-700 px-4 w-full items-center text-xl">
          {l.ic}
          <p className="px-4 my-3 font-semibold capitalize">{l.li}</p>
        </Link >
      ))}
    </div>
  );
};

export default Menubar;
