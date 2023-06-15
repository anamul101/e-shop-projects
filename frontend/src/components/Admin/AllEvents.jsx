import axios from "axios";
import React, { useEffect, useState } from "react";
import {  AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
   axios.get(`${server}/event/admin-all-events`, {withCredentials: true}).then((res) =>{
    setEvents(res.data.events);
   })
  }, []);

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>stock</th>
                                    <th>sold</th>
                                    <th>Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    events && events.map((item) =>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.discountPrice}</td>
                                            <td>{item.stock}</td>
                                            <td>{item?.sold_out}</td>
                                            <td>
                                                <Link to ={`/product/${item._id}?isEvent=true`}>
                                                    <button>
                                                    <AiOutlineEye size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
    </div>
  );
};

export default AllEvents;