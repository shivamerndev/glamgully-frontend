import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowRoundDown } from "react-icons/io";
import { IoArrowDown, IoChevronDown, IoLocateOutline, IoLocateSharp, IoLocation } from "react-icons/io5";
import { Md16Mp, MdLocalActivity, MdLocalShipping, MdLocationSearching, MdSendAndArchive } from "react-icons/md";
import CitySelector from "./CitySelector";

const LocationChooser = () => {
    const [location, setLocation] = useState(localStorage.getItem("location") || "");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const cities = ["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai"];

    // 🔹 Auto Detect Location
    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Free API (OpenStreetMap - Nominatim)
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const data = await response.json();
                        const cityName =
                            data.address.city ||
                            data.address.town ||
                            data.address.state ||
                            data.address.country;

                        setLocation(cityName + ", " + "india");
                        localStorage.setItem("location", cityName + ", " + "india");
                    } catch (err) {
                        setError("Failed to fetch city name.");
                    }
                },
                (err) => {
                    setError("Permission denied");
                }
            );
        } else {
            setError("Geolocation not supported.");
        }
    };

    // 🔹 Save manual selection
    const handleSelect = (city) => {
        setLocation(city + ", " + "india");
        localStorage.setItem("location", city + ", " + "india");
        setOpen(false);
    };

    // 🔹 Auto detect if nothing saved
    useEffect(() => {
        if (!location) {
            detectLocation()
        } 
    }, []);

    return (
        <div className="w-full lg:w-3/4 max-w-xs relative px-4 pt-4 md:pt-0">
            {/* Label */}
            <p className="text-zinc-500 text-base font-semibold pl-2">Location</p>
            {/* Location Row */}
            <div className="flex items-center gap-2 cursor-pointer rounded-lg  hover:shadow-xs transition"
                onClick={() => setOpen(!open)}>
                <MdLocalShipping className="h-5 w-5 text-red-500" />
                <span className="font-semibold md:text-sm lg:text-base text-gray-800">
                    {location || error || "Searching..."}
                </span>
                <IoChevronDown className="h-5 w-5 font-semibold text-gray-500" />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute mt-1 border px-2 border-amber-950 rounded-lg bg-white shadow-lg w-full z-50">
                    {/* Auto Detect option */}
                    <div
                        onClick={detectLocation}
                        className=" pt-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1 px-2 text-blue-600 font-medium">
                        <IoLocation className="text-red-500" /> <span>Detect My Location</span>
                    </div>
                    <CitySelector setLocation={setLocation} setOpen={setOpen} />
                    <h1 className="font-bold px-2 text-zinc-500 pb-2">Popular Cites.</h1>
                    {/* Manual Cities */}
                    {cities.map((city, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(city)}
                            className="px-3 py-1 hover:bg-gray-100 font-semibold cursor-pointer">
                            {city}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationChooser;
