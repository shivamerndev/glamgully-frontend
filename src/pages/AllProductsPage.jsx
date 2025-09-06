import { useContext, useEffect, useState } from "react";
import { ProductDataContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import FlashSale from "../components/FlashSale"
import FilterSortUI from "../components/FilterSortUi";
import SearchInput from "../components/SearchInput"
import BackTitle from "../components/BackTitle";
import ProgressLoader from "../utils/ProgressLoader";

const AllProductsPage = () => {
    const { getProducts, ProdcutByCategory } = useContext(ProductDataContext);
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
        if (productname) {
            ProdcutByCategory(productname).then((data) => {
                setProducts(data);
                setTotalProducts(data.length)
            })
        } else {
            getProducts(1, limit, sort).then((data) => {
                setProducts(data.products);
                setTotalProducts(data.totalProducts)
                setInStockProducts(data.instockProducts)
            })
        }
    }, []);

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
        <div className="w-full min-h-screen py-2 ">
            {/* {isOpen && <FilterSidebar total={totalProducts} filterpro={handleFilter} arr={products} onClose={setIsOpen} setSort={setSort} instock={instockProducts} />} */}
            <BackTitle page={productname || "All Products"} icon={false} />
            <nav className="relative w-full px-4 lg:px-8">
                <div className="md:absolute md:left-[55vw] lg:left-1/2 md:-translate-x-1/2 md:-translate-y-1/3 w-full lg:w-1/2 z-10 md:w-2/5">
                    <SearchInput />
                </div>
                <FilterSortUI totalProducts={totalProducts} />
            </nav>
            <InfiniteScroll
                dataLength={products ? products.length : 0}
                next={() => {
                    if (productname) {
                        ProdcutByCategory(productname, page + 1, limit, sort).then((data) => {
                            if (data.length === 0) {
                                setHasMore(false);
                            } else {
                                setProducts((prev) => [...prev, ...data]);
                                setPage((prev) => prev + 1);
                            }
                        })
                    } else {
                        getProducts(page + 1, limit, sort).then((data) => {
                            if (data.products.length === 0) {
                                setHasMore(false);
                            } else {
                                setProducts((prev) => [...prev, ...data.products]);
                                setPage((prev) => prev + 1);
                            }
                        })
                    }
                }}
                hasMore={hasMore}
                loader={<h4 className="text-center my-4 font-semibold text-green-500">Loading...</h4>}
                endMessage={
                    <p className="text-center my-4 text-green-500">
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                <FlashSale page={"page"} allProduct={products} />
            </InfiniteScroll>
        </div> : <ProgressLoader response={products} />
    )
}

export default AllProductsPage;
