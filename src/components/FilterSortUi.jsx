import { useState } from 'react';
import { ChevronDown, Filter, SortAsc, Package, X } from 'lucide-react';
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const FilterSortUI = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [showSort, setshowSort] = useState(false)




    const sortOptions = [
        { id: 'a-z', label: 'Alphabet : A-Z' },
        { id: 'z-a', label: 'Alphabet : Z-A' },
        { id: 'newest', label: 'Date: Newest First' },
        { id: 'oldest', label: 'Date: Oldest First' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
    ];

    return (
        <div className="w-full  bg-white">
            {/* Header Section */}
            <div className="flex justify-between items-center gap-2 font-semibold">

                {/* Filter & Sort Controls */}
                <div className="flex items-center gap-2 sm:gap-3 ">
                    {/* Filter Button */}
                    <div className="relative ">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-50 to-indigo-50  border border-blue-200 rounded-lg  font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            <Filter className="w-4 h-4 text-indigo-700" />
                            <span className="text-sm sm:text-base text-indigo-900">Filter</span>
                            <ChevronDown className={`w-4 h-4 text-indigo-700 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Filter Dropdown */}
                        {showFilters && (<div onClick={(e) => {
                            if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.tagName === "SPAN") {
                                setTimeout(() => {
                                    setShowFilters(false)
                                }, 10);
                            }
                        }} className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-amber-50 text-amber-800 border border-gray-200 rounded-xl shadow-lg z-50 max-h-screen overflow-y-auto">
                            <div className="py-3 px-4">

                                <div className="mb-2">
                                    <h4 className="font-semibold text-amber-950  mb-2">Availability</h4>
                                    {[{ id: 'instock', label: 'Instock' }, { id: 'outstock', label: ' Out of stock' },].map((c) => < label key={c.id} className="flex items-center cursor-pointer group">
                                        <input type="checkbox" name="availability"
                                            className="w-4 h-4 border-gray-300 rounded accent-amber-900" />
                                        <span className="ml-2 text-sm  ">{'stock'} (55) </span>
                                    </label>)}
                                </div>

                                <div className="mb-2">
                                    <h4 className="font-semibold text-amber-950  mb-2">Category</h4>
                                    <label className="flex items-center cursor-pointer group">
                                        <input type="checkbox"
                                            className="w-4 h-4  border-gray-300 rounded accent-amber-900 " />
                                        <span className="ml-2 text-sm  ">
                                            hero
                                        </span>
                                    </label>
                                </div>

                                <div className="mb-2">
                                    <h4 className="font-semibold text-amber-950  mb-1">Price</h4>
                                    <div className="flex justify-between text-amber-950 mb-2 text-sm font-semibold ">
                                        <p className='bg-amber-200 rounded-full px-4 text-center py-1'>₹.00</p>
                                        <p className='bg-amber-200 rounded-full px-4 text-center py-1'>₹.00</p>
                                    </div>
                                    <Slider range min={50} max={555} step={10} value={555}
                                        trackStyle={[{ backgroundColor: "#ffa571", height: 8 }]}
                                        handleStyle={[
                                            { borderColor: "#812828", backgroundColor: "#d1d5db", marginTop: -4, height: 16, width: 16 },
                                            { borderColor: "#812828", backgroundColor: "#d1d5db", marginTop: -4, height: 16, width: 16 },
                                        ]} railStyle={{ backgroundColor: "#812828", height: 8 }} />
                                    {<button className='text-sm bg-gradient-to-bl from-amber-700 to-orange-600 rounded-full pb-0.5 px-3 mt-4 mx-auto block cursor-pointer text-white '>
                                        Apply
                                    </button>}
                                </div>

                                <div className="mb-2">
                                    <h4 className="font-semibold text-amber-950  mb-2">Rating</h4>
                                    {[1, 2, 3, 4].map((r) => <div key={r} className="space-y-2">
                                        <label className="flex items-center cursor-pointer group">
                                            <input onChange={(e) => selectedFilters.rating.push(r)}
                                                type="checkbox"
                                                className="w-4 h-4  border-gray-300 rounded accent-amber-900" />
                                            <span className="ml-2 text-sm  group-">
                                                {r}+ Stars
                                            </span>
                                        </label>
                                    </div>)}
                                </div>

                            </div>
                        </div>
                        )}

                    </div>

                    {/* Sort Button */}
                    <div className="relative">
                        <button onClick={() => setshowSort(!showSort)}
                            className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50  border border-green-200 rounded-lg  font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            <SortAsc className="w-4 h-4 text-green-700" />
                            <span className="text-sm sm:text-base text-green-900">Sort</span>
                            <ChevronDown className={`w-4 h-4 text-green-700 transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Sort Dropdown */}

                        {showSort && <div className="absolute top-full text-amber-950 left-0 mt-2 w-56 bg-amber-100 border border-amber-500 rounded-xl shadow-lg z-50">
                            <div className="p-2">
                                <button className={`w-full text-left px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors duration-150`}>
                                    {"option"}
                                </button>

                            </div>
                        </div>}
                    </div>
                </div>

                {/* Product Count */}
                <div className="flex items-center text-sm gap-1 text-amber-950  bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <Package className="w-4 h-4 text-amber-600" />
                    <span className="hidden whitespace-nowrap xs:inline">Total :</span>
                    <span className="text-amber-700 pl-1">{"totalProducts"}</span>

                </div>
            </div>

            {/* Active Filters */}

            <div className="my-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-medium ">Active Filters:</span>
                    <button
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                        Clear All
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">

                    <span
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        <button
                            className="text-blue-600">
                            <X className="w-3 h-3" />
                        </button>
                    </span>

                </div>
            </div>


            {/* Current Sort Display */}
            <div className="text-sm pt-3 ">
                Sorted by: <span className="font-medium  "></span>
            </div>
        </div>
    );
};

export default FilterSortUI;