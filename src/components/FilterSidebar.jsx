import React, { useEffect, useRef } from "react";
import { IoClose, IoChevronForward, IoChevronDown } from "react-icons/io5";

export default function FilterSidebar({ onClose }) {
    // const sidebarRef = useRef();
    // const handleClickOutside = (e) => {
    //     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
    //         onClose(false);
    //     }
    // };
    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            onClose(false)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <div id="modal-backdrop" onClick={handleBackdropClick} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div ref={sidebarRef} className="ml-auto h-full w-80 bg-white py-4 z-50 shadow-lg">
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="px-4">
                        <h2 className="text-lg font-medium">Filter and sort</h2>
                        <p className="text-sm text-gray-500">5 products</p>
                    </div>
                    <button className="px-4" onClick={()=>onClose(false)}>
                        <IoClose size={24} />
                    </button>
                </div>
                <div className="mt-6 px-4 text-lg   space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Availability</span>
                        <IoChevronForward size={20} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Price</span>
                        <IoChevronForward size={20} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sort by:</span>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <span>Date, new to old</span>
                            <IoChevronDown size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
