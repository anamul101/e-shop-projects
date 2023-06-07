
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllRefundOrder = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Items Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.map((singleOrder) =>
                                        <tr>
                                            <th>{singleOrder._id}</th>
                                            <td><p className="text-green-600">{singleOrder.status}</p></td>
                                            <td>{singleOrder.cart.length}</td>
                                            <td>USD${singleOrder.totalPrice}</td>
                                            <td>
                                                <button className="hover:background-gray-400">
                                                    <Link to={`/order/${singleOrder._id}`}>
                                                        <AiOutlineArrowRight size={20} />
                                                    </Link>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

 export default AllRefundOrder ;