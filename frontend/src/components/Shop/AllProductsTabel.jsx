import React from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllProductsTabel = ({ singleProduct,params }) => {
    console.log(singleProduct)
    const { name, _id, originalPrice, stock, sold_out } = singleProduct;
    const handleDelete=()=>{

    }
    return (
        <>
            <div>
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
                            <tr>
                                <th>{_id}</th>
                                <td>{name}</td>
                                <td>{originalPrice}</td>
                                <td>{stock}</td>
                                <td>{sold_out}</td>
                                <td>
                                    <Link to={`/product/${singleProduct._id}`}>
                                        <button>
                                            <AiOutlineEye size={20} />
                                        </button>
                                    </Link>

                                </td>
                                <td>
                                    <button onClick={() => handleDelete(singleProduct._id)}>
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllProductsTabel;