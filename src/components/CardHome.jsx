function CardHome({ product }) {
    return (
        <div className="min-w-[70vw] bg-red-500 rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-4 hover:shadow-lg transition-all duration-300 shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                <img
                    src={product.productimage[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <h2 className="mt-3 text-lg font-semibold text-gray-800 text-center truncate">
                {product.title }
            </h2>
            <p className="text-gray-600 text-sm text-center">
                ₹{product.price}
            </p>
            <button
                onClick={"addCart"}
                className="flex justify-center items-center gap-2 w-full py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 transition-colors"
            >
                {"cartLoad" ? (
                    <img className="h-5" src={"CartLoader"} alt="loading..." />
                ) : cartbtn ? (
                    <>Added ✅</>
                ) : (
                    <>Add to Cart</>
                )}
            </button>
        </div>
    );
}
export default CardHome;
