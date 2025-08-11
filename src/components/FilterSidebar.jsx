import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { use } from "react";
import { IoClose, IoChevronForward, IoChevronDown } from "react-icons/io5";
import { axiosProductInstance } from "../utils/axios.instance";

export default function FilterSidebar({ instock, total, filterpro, setSort, onClose, arr }) {
  const sidebarRef = useRef();
  let obj = { instock: false, outstock: false }
  const [avail, setavail] = useState(obj);
  const [price, setprice] = useState({ from: '', to: '' });
  const [x, setx] = useState('100%');
  const [y, sety] = useState('100%');
  const [hideMenu, setHideMenu] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [highestPrice, setHighPrice] = useState(0);

  const handleSwipe = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX < -50) {
      setHideMenu(true); // animation trigger
      setTimeout(() => {
        onClose(false); // close sidebar
      }, 300);
    }
  };
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      onClose(false);
    }
  };
  useEffect(() => {
    getHigestPrice()
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose(false)
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (price.from !== '' && price.to !== '') {
        filterpro("", price);
        onClose(false)
      }
    }, 2000);
    return () => clearTimeout(delay);
  }, [price]);

  const getHigestPrice = async () => {
    try {
      const price = await axiosProductInstance.get('/highest/price')
      setHighPrice(price.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if (avail.instock) {
        filterpro(avail)
      }
      else if (avail.outstock) {
        filterpro(avail)
      } else {
        return;
      }
    }, 200);
    return () => clearTimeout(delay);
  }, [avail]);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        id="modal-backdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`ml-auto relative h-full w-80 bg-white py-4 z-50 shadow-lg transition-transform duration-300 ease-in-out ${hideMenu ? "translate-x-full" : "translate-x-0"
          }`}>
        {/* Availability Panel */}
        <div
          style={{ transform: `translateX(${y})` }}
          className="w-full px-4 bg-white h-1/3 top-20 absolute transition-transform duration-300 ease-in-out">
          <div className="flex gap-3 items-center">
            <IoChevronForward
              onClick={() => sety("100%")}
              className="rotate-180 cursor-pointer hover:text-gray-500"
              size={20} />
            <span className="text-gray-800 text-lg font-medium">Availability</span>
          </div>
          <div className="flex flex-col gap-3 text-lg mt-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                onChange={(e) => setavail({ instock: e.target.checked, outstock: false })}
                className="w-5 h-5 accent-indigo-600"
                type="checkbox"
                name="available"
                checked={avail.instock}
              />
              <span>In stock ({instock})</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                onChange={(e) => setavail({ instock: false, outstock: e.target.checked })}
                className="w-5 h-5 accent-indigo-600"
                type="checkbox"
                name="available"
                checked={avail.outstock}
              />
              <span>Out of stock ({total - instock || 0})</span>
            </label>
          </div>
        </div>

        {/* Price Panel */}
        <div
          style={{ transform: `translateX(${x})` }}
          className="w-full px-4 bg-white h-1/3 top-20 absolute transition-transform duration-300 ease-in-out"
        >
          <div className="flex gap-4 items-center ">
            <IoChevronForward
              onClick={() => setx("100%")}
              className="rotate-180 cursor-pointer hover:text-gray-500"
              size={20}
            />
            <span className="text-gray-800 text-lg font-medium">Price</span>
          </div>
          <p className="text-base mt-4 text-gray-600">
            The highest price is Rs.{highestPrice}.00
          </p>
          <div className="flex mt-6 gap-4 items-center">
            <span className="text-2xl text-gray-700">₹</span>
            <input onChange={(e) => setprice({ ...price, from: e.target.value })}
              value={price.from}
              placeholder="From"
              className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded px-3 py-1 w-1/2 text-base"
              type="number"
            />
            <span className="text-2xl text-gray-700">₹</span>
            <input onChange={(e) => setprice({ ...price, to: e.target.value })}
              value={price.to}
              placeholder="To"
              className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded px-3 py-1 w-1/2 text-base"
              type="number"
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 px-4">
          <div>
            <h2 className="text-lg font-semibold">Filter and sort</h2>
            <p className="text-sm text-gray-500">{total} products</p>
          </div>
          <button
            className="hover:bg-gray-100 p-1 rounded-full transition"
            onClick={() => onClose(false)}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Main Menu */}
        <div className="mt-6 px-4 text-lg space-y-4">
          <div
            onClick={() => sety("0")}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
            <span className="text-gray-700">Availability</span>
            <IoChevronForward size={20} />
          </div>

          <div
            onClick={() => setx("0")}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded px-2 py-1">
            <span className="text-gray-700">Price</span>
            <IoChevronForward size={20} />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Sort by:</span>
            <select
              onChange={(e) => { setSort(e.target.value); onClose(false) }}
              name="filter"
              id="sortby"
              defaultValue={'atz'}
              className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
              <option value="atz">Alphabet A-Z</option>
              <option value="zta">Alphabet Z-A</option>
              <option value="lth">Price, Low-High</option>
              <option value="htl">Price, High-Low</option>
              <option value="otn">Date, Old-New</option>
              <option value="nto">Date, New-Old</option>
            </select>
          </div>
        </div>
      </div>
    </div>

  );
}
