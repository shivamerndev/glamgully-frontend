import React, { useEffect, useRef, useState } from "react";
import { IoClose, IoChevronForward, IoChevronDown } from "react-icons/io5";

export default function FilterSidebar({ onClose, arr }) {
    const sidebarRef = useRef();
    const [x, setx] = useState('100%');
    const [y, sety] = useState('100%');


    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            onClose(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            onClose(false)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <div id="modal-backdrop" onClick={handleBackdropClick} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div ref={sidebarRef} className="ml-auto relative h-full w-80 bg-white py-4 z-50 shadow-lg">
                <div style={{ transform: `translateX(${y})` }} className={`w-full px-2 bg-white h-1/3 top-20 absolute  transition-transform duration-300 ease-in-out`}>
                    <div className="flex gap-3 items-center">
                        <IoChevronForward onClick={() => sety('100%')} className="rotate-180" size={20} />
                        <span className="text-gray-700 text-lg">Availability</span>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2  text-lg mt-6 px-4">
                        <label>
                            <input className=" shrink-0  w-6 h-4" type="checkbox" name="in" />
                            <span className=" whitespace-nowrap"> In stock ({arr?.length}) </span>
                        </label>
                        <label>
                            <input className=" shrink-0  w-6 h-4" type="checkbox" name="out" />
                            <span className=" whitespace-nowrap"> Out of stock (00) </span>
                        </label>
                    </div>

                </div>
                <div style={{ transform: `translateX(${x})` }} className={`w-full px-2 bg-white h-1/3 top-20 absolute  transition-transform duration-300 ease-in-out`}>
                    <div className="flex gap-4 items-center">
                        <IoChevronForward onClick={() => setx('100%')} className="rotate-180" size={20} />
                        <span className="text-gray-700 text-lg">Price</span>
                    </div>
                    <p className="text-base px-4 mt-4 capitalize text-left">The highest price is Rs.1985.00</p>
                    <div className="flex mt-8 gap-4  items-center w-full ">
                        <span className="text-2xl "> ₹ </span>
                        <input placeholder="from" className="border text-base px-3 rounded  py-1 w-1/2 " type="number" />
                        <span className="text-2xl "> ₹ </span>
                        <input placeholder="to" className="border text-base px-3 rounded  py-1 w-1/2 " type="number" />
                    </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="px-4">
                        <h2 className="text-lg font-medium">Filter and sort</h2>
                        <p className="text-sm text-gray-500">{arr?.length} products</p>
                    </div>
                    <button className="px-4" onClick={() => onClose(false)}>
                        <IoClose size={24} />
                    </button>
                </div>
                <div className="mt-6 px-4 text-lg  space-y-6">
                    <div onClick={() => sety('0')} className="flex justify-between items-center">
                        <span className="text-gray-700">Availability</span>
                        <IoChevronForward size={20} />
                    </div>

                    <div onClick={() => setx('0')} className="flex justify-between items-center">
                        <span className="text-gray-700">Price</span>
                        <IoChevronForward size={20} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sort by:</span>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <select name="filter" id="sortby" defaultValue="otn" className="bg-white border border-gray-300 rounded-md px-2 py-1">
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
        </div>
    );
}
