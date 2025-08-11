import { CiFilter } from "react-icons/ci";
import Card from "../components/Card";
import { useContext, useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import { ProductDataContext } from "../context/ProductContext";
import Loader from '../../src/assets/loader.gif';
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";


const CategoryPage = () => {
    const { getProducts } = useContext(ProductDataContext);
    const { productname } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState(null);
    const [filterlength, setfilterlength] = useState(null)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('atz'); // default sort by "Old-New"
    const [totalProducts, setTotalProducts] = useState(0);
    const [instockProducts, setInStockProducts] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setfilterlength(null)
        getProducts(1, limit, sort).then((data) => {
            if (!productname) {
                setProducts(data.products);
                setTotalProducts(data.totalProducts);
                setInStockProducts(data.instockProducts);
            } else {
                // categorize from backend and get category wise products from find(proname).
                //  if website growth crossing limit
                const filteredProducts = data.products.filter((product) => product.category.trim() === productname);
                setProducts(filteredProducts);
                setTotalProducts(filteredProducts.length);
                setInStockProducts(filteredProducts.filter(product => product.quantity > 0).length);
            }
        });
    }, [sort, productname]);

    const handleFilter = async (availablity, priceRange) => {
        const res = await axios.post(`${import.meta.env.VITE_PRODUCT_BASE}/api/products/filter`, {
            availablity,
            priceRange
        });
        setProducts(res.data);
        setfilterlength(res.data.length)
        setHasMore(false)
    }


    return (products ?
        <div className="  py-4 text-base w-full min-h-screen bg-gray-50">
            {isOpen && <FilterSidebar total={totalProducts} filterpro={handleFilter} arr={products} onClose={setIsOpen} setSort={setSort} instock={instockProducts} />}

            {/* Top Bar */}
            <div className="flex px-4 justify-between items-center my-2 text-sm md:text-base w-full">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 capitalize text-gray-700 hover:text-black transition-colors">
                    <CiFilter className="text-2xl" />
                    Filter & Sort
                </button>
                {/* <span className="text-gray-500">{totalProducts > products.length && products.length + ' of ' }{totalProducts} Products</span> */}
                <span className="text-gray-500">{filterlength && filterlength + ' of '}{totalProducts} Products</span>
            </div>

            {/* Product List */}
            <InfiniteScroll
                dataLength={products.length}
                // next={() => {
                //     if (products.length < 10) {
                //         setHasMore(false)
                //         return;
                //     }
                //     getProducts(page + 1, limit, sort).then((data) => {
                //         if (data.products.length > 0) {
                //             setProducts((prev) => [...prev, ...data.products]);
                //             setPage((prev) => prev + 1);
                //         } else {
                //             setHasMore(false);
                //         }
                //     })
                // }}

                next={() => {
                    if (products.length < 10) {
                        setHasMore(false)
                        return;
                    }
                    getProducts(page + 1, limit, sort).then((data) => {
                        if (data.products.length > 0) {
                            setProducts((prev) => [...prev, ...data.products]);
                            setPage((prev) => prev + 1);
                        } else {
                            setHasMore(false);
                        }
                    })
                }}
                hasMore={hasMore}
                loader={products.length >= 10 &&
                    <div className="flex justify-center w-full">
                        <img className="h-18" src="/public/infinite scroll.gif" alt="loading..." />
                    </div>
                }>
                <div className="h-full w-full grid grid-cols-2 gap-4 mt-4 justify-items-center px-4 xs:px-0 max-xs:grid max-xs:grid-cols-1">
                    {products?.map((p, i) => (
                        <Card key={i} r={'md'} product={p} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>

        : <div className=" flex justify-center items-center h-10/12 w-full ">
            <img className=" object-contain h-2/4 w-2/5 " src={Loader} alt="product loading..." />
        </div>
    )
}

export default CategoryPage
