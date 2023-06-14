import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-hot-toast";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
    const dispatch = useDispatch();
    const { sellers } = useSelector((state) => state.seller);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(getAllSellers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
            });

        dispatch(getAllSellers());
    };

    return (
        <div className="w-full flex justify-center pt-5">
            <div className="w-[97%]">
                <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
                <div className="w-full min-h-[45vh] bg-white rounded">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>joinedAt</th>
                                    <th>Preview</th>
                                    <th>Delete Seller</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sellers && sellers.map((item) =>
                                        <tr>
                                            <td><p>{item.name}</p></td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>{item.createdAt.slice(0, 10)}</td>
                                            <td>
                                                <Link to ={`/shop/preview/${item._id}`}>
                                                    <button>
                                                    <AiOutlineEye size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => setUserId(item._id) || setOpen(true)}
                                                >
                                                    <AiOutlineDelete size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {open && (
                    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                        <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                            <div className="w-full flex justify-end cursor-pointer">
                                <RxCross1 size={25} onClick={() => setOpen(false)} />
                            </div>
                            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                                Are you sure you wanna delete this seller?
                            </h3>
                            <div className="w-full flex items-center justify-center">
                                <div
                                    className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                                    onClick={() => setOpen(false)}
                                >
                                    cancel
                                </div>
                                <div
                                    className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                                    onClick={() => setOpen(false) || handleDelete(userId)}
                                >
                                    confirm
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllSellers;