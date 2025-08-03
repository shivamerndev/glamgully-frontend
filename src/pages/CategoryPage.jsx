import { CiFilter } from "react-icons/ci";
import Card from "../components/Card";
import { useContext, useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import { ProductDataContext } from "../context/ProductContext";
import Loader from '../../src/assets/loader.gif';
import { useParams } from "react-router-dom";


const CategoryPage = () => {
    const { productname } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const { getProducts } = useContext(ProductDataContext);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        getProducts().then((data) => {
            if (!productname) setProducts(data);
            else {
                const filteredProducts = data.filter((product) => product.category === productname);
                setProducts(filteredProducts);
            }
        });
    }, [productname]);

    

    return (products ?
        <div className='px-2  text-xl text-center py-4 w-full h-screen'>
            {isOpen && <FilterSidebar arr={products} onClose={setIsOpen} />}
            <div className="flex justify-between my-2 text-base w-full">
                <h1 onClick={() => setIsOpen(true)} className="flex items-center gap-2 capitalize"> <CiFilter className="text-2xl" />  filter and sort</h1>
                <h1>{products?.length} Products</h1>
            </div>
            <div className="w-full mt-8 flex justify-center gap-3 flex-wrap text-base ">
                {products.map((p, i) => <Card key={i} r={'md'} product={p} />)}
            </div>
        </div> : <div className=" flex justify-center items-center h-10/12 w-full ">
            <img className=" object-contain h-2/4 w-2/5 "
                src={Loader} alt="product loading..." />
        </div>
    )
}

export default CategoryPage
