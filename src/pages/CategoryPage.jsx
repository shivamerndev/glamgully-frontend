import { CiFilter } from "react-icons/ci";
import Card from "../components/Card";
import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";


const CategoryPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='px-4  text-xl text-center py-4 w-full h-screen'>
            {isOpen && <FilterSidebar onClose={setIsOpen} />}
            <div className="flex justify-between my-2 text-base w-full">
                <h1 onClick={() => setIsOpen(true)} className="flex items-center gap-2 capitalize"> <CiFilter className="text-2xl" />  filter and sort</h1>
                <h1>5 Products</h1>
            </div>
            <div className="w-full mt-8 flex gap-3  text-base flex-wrap">
                <Card r={'md'} img={"/Walletimg.webp"} />
                <Card r={'md'} img={"/wallet2.webp"} />
                <Card r={'md'} img={"/wallet2.webp"} />
                <Card r={'md'} img={"/Walletimg.webp"} />
                <Card r={'md'} img={"/Walletimg.webp"} />
            </div>
        </div>
    )
}

export default CategoryPage
