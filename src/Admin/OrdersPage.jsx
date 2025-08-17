import React, { useEffect, useState, useContext } from 'react'
import { OrderDataContext } from '../context/OrderContext'

const OrdersPage = () => {

    const { readOrder } = useContext(OrderDataContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        readOrder().then(res => {
            setOrders(res.total)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <div className="flex flex-col  min-h-screen bg-gray-100">
                <h1 className="text-2xl fixed bg-gradient-to-tl from-green-400 from-30% to-rose-300 rounded font-bold uppercase w-full text-center py-2 text-yellow-100">
                    All Orders
                </h1>

                <div className="grid mt-16 mb-4 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
                    {orders?.map((order, index) => {
                        const titles = order.title.trim().split("\n");
                        const qtys = order.stock.trim().split("\n");

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-3 px-4 hover:shadow-lg transition">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                   Order #{orders.length - index}
                                </h2>

                                <div className="space-y-1">
                                    {titles.map((t, i) => (
                                        <p key={i} className="text-gray-700">
                                            <span className="font-medium">{t}</span> : {qtys[i] || 0}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-3 border-t pt-2">
                                    <p className="text-right font-bold text-green-600">
                                        ₹{order.price}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default OrdersPage
