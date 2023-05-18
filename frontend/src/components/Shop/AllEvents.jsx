import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEventsShop } from "../../redux/actions/event";
import { deleteEvent} from "../../redux/actions/event";
import Loader from "../Layout/Loader";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

const AllEvents = () => {
    const { events, isLoading } = useSelector((state) => state.events);
    const { seller } = useSelector((state) => state.seller);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEventsShop(seller._id));
    }, [dispatch]);
    // const { name, _id, originalPrice, stock, sold_out } = products;
    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
        window.location.reload();
        toast.success("Your Products has been Successfull");
    }
    return (
        <>
        {isLoading ? (
            <Loader />
          ) :(
            <div className="w-full mx-4">
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Sold Out</th>
                                <th>Preview</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                events && events.map((singleevents) =>
                                    <tr>
                                        <th>{singleevents._id}</th>
                                        <td>{singleevents.name}</td>
                                        <td>{singleevents.originalPrice}</td>
                                        <td>{singleevents.stock}</td>
                                        <td>{singleevents.sold_out}</td>
                                        <td>
                                            <Link to={`/product/${singleevents._id}`}>
                                                <button>
                                                    <AiOutlineEye size={20} />
                                                </button>
                                            </Link>

                                        </td>
                                        <td>
                                           <button onClick={() => handleDelete(singleevents._id)}>
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

          )}
        </>
    );
};

export default AllEvents;