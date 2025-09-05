import React, { useState } from 'react';
import { ChevronDown, Filter, SortAsc, Package, X } from 'lucide-react';

const FilterSortUI = ({totalProducts}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedSort, setSelectedSort] = useState('newest');

    const filterOptions = [
        { id: 'category', label: 'Category', options: ['Electronics', 'Clothing', 'Home & Garden', 'Sports'] },
        { id: 'price', label: 'Price Range', options: ['Under $25', '$25-$50', '$50-$100', 'Over $100'] },
        { id: 'brand', label: 'Brand', options: ['Apple', 'Samsung', 'Nike', 'Adidas'] },
        { id: 'rating', label: 'Rating', options: ['4+ Stars', '3+ Stars', '2+ Stars'] }
    ];

    const sortOptions = [
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
        { id: 'rating', label: 'Highest Rated' },
        { id: 'popular', label: 'Most Popular' }
    ];

    const toggleFilter = (filterId, option) => {
        const filterKey = `${filterId}-${option}`;
        setSelectedFilters(prev =>
            prev.includes(filterKey)
                ? prev.filter(f => f !== filterKey)
                : [...prev, filterKey]
        );
    };

    const removeFilter = (filterToRemove) => {
        setSelectedFilters(prev => prev.filter(f => f !== filterToRemove));
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
    };

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
                            className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            <Filter className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm sm:text-base">Filter</span>
                            <ChevronDown className={`w-4 h-4 text-indigo-600 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Filter Dropdown */}
                        {showFilters && (
                            <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-800">Filters</h3>
                                        <button
                                            onClick={() => setShowFilters(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {filterOptions.map((filter) => (
                                        <div key={filter.id} className="mb-4">
                                            <h4 className="font-medium text-gray-700 mb-2">{filter.label}</h4>
                                            <div className="space-y-2">
                                                {filter.options.map((option) => {
                                                    const filterKey = `${filter.id}-${option}`;
                                                    const isSelected = selectedFilters.includes(filterKey);
                                                    return (
                                                        <label key={option} className="flex items-center cursor-pointer group">
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={() => toggleFilter(filter.id, option)}
                                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            />
                                                            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                                                                {option}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sort Button */}
                    <div className="relative">
                        <button onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                            <SortAsc className="w-4 h-4 text-green-500" />
                            <span className="text-sm sm:text-base">Sort</span>
                            <ChevronDown className={`w-4 h-4 text-green-600 transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Sort Dropdown */}
                        {showSort && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                                <div className="p-2">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => {
                                                setSelectedSort(option.id);
                                                setShowSort(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${selectedSort === option.id
                                                ? 'bg-green-100 text-green-800 font-medium'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Count */}
                <div className="flex items-center text-sm gap-1 text-gray-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <Package className="w-4 h-4 text-amber-600" />
                    <span className="hidden whitespace-nowrap xs:inline">Total :</span>
                    <span className="text-amber-700 pl-1">{totalProducts}</span>

                </div>
            </div>

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
                <div className="my-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedFilters.map((filter) => {
                            const [category, ...valueParts] = filter.split('-');
                            const value = valueParts.join('-');
                            return (
                                <span
                                    key={filter}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                    {value}
                                    <button
                                        onClick={() => removeFilter(filter)}
                                        className="hover:text-blue-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Current Sort Display */}
            <div className="text-sm pt-3 text-gray-600">
                Sorted by: <span className="font-medium  text-gray-800">{sortOptions.find(s => s.id === selectedSort)?.label}</span>
            </div>
        </div>
    );
};

export default FilterSortUI;