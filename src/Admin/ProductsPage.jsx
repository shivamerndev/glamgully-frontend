import { useContext, useEffect, useState } from 'react'
import { ProductDataContext } from "../context/ProductContext";
import AdminNavbar from './AdminNavbar';
import FormProduct from './FormProduct';
import Loader from '../../src/assets/loader.gif';

const ProductsPage = () => {
    const { getProductsAdmin, editProduct } = useContext(ProductDataContext)
    const [products, setProducts] = useState([])
    const [isActiveState, setIsActiveState] = useState({})
    const [showModal, setShowModal] = useState(false);


    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
            setShowModal(false);
        }
    };

    useEffect(() => {
        getProductsAdmin().then((data) => {
            setProducts(data);
        })
    }, [showModal]);

    return (products.length > 0 ?
        <>
            <AdminNavbar focus={'Products'} />
            {showModal && <FormProduct EditProduct={showModal} setShowModal={setShowModal} handleBackdropClick={handleBackdropClick} />}
            <div className="bg-white overflow-hidden  shadow pt-25 ">
                {/* Fixed Header */}
                <table className="min-w-full fixed z-1 top-25 text-center">
                    <thead className="bg-zinc-800  text-white text-sm uppercase tracking-wide">
                        <tr>
                            <th className="px-1 py-3">Products Name</th>
                            <th className="px-1 py-3">Qty.</th>
                            <th className="px-1 py-3">Price</th>
                            <th className="px-1 py-3">Status</th>
                        </tr>
                    </thead>
                </table>
                {/* Scrollable Body */}
                <div className=" fixed w-full   overflow-auto top-35 max-h-[80vh] pb-2 ">
                    <table className=" text-center">
                        <tbody className="text-sm  ">
                            {products?.map((p, i) => (
                                <tr key={i}
                                    onClick={(e) => {
                                        if (e.target.textContent === 'Active' || e.target.textContent === 'Inactive') {
                                            return;
                                        } else {
                                            setShowModal({ edit: p })
                                        }
                                    }}
                                    className={`border-b hover:bg-pink-100 transition-colors  ${p.quantity <= 5 ? "bg-red-200" : ""}`}>
                                    <td className="px-2 py-3 font-medium text-gray-700">{p.title}</td>
                                    <td className={`px-2 py-3 font-semibold ${p.quantity <= 5 ? "text-red-600" : "text-gray-600"}`}>
                                        {p.quantity < 10 ? `0${p.quantity}` : p.quantity}
                                    </td>
                                    <td className="px-2 py-3 text-gray-700">₹{p.price}.00</td>
                                    <td
                                        onClick={() => {
                                            setIsActiveState((prev) => {
                                                const newState = {
                                                    ...prev,
                                                    [p._id]: !(prev[p._id] ?? p.isActive),
                                                };
                                                editProduct({
                                                    ...p,
                                                    isActive: !(prev[p._id] ?? p.isActive),
                                                });
                                                return newState;
                                            });
                                        }}
                                        className="px-2 py-3 cursor-pointer"
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${(isActiveState[p._id] ?? p.isActive)
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {(isActiveState[p._id] ?? p.isActive) ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </> : <div className=" flex justify-center items-center h-full  w-full ">
            <img className=" object-contain h-2/4 w-2/5 "
                src={Loader} alt="loading..." />
        </div>
    )
}

export default ProductsPage;
