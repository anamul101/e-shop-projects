import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct,deleteProductSuccess } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

const AllProducts = () => {
    const { products, isLoading } = useSelector((state) => state.products);
    const { seller } = useSelector((state) => state.seller);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch]);
    
    const handleDelete = (id) => {
        dispatch(deleteProduct(id))
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
                                products && products.map((singleProduct) =>
                                    <tr>
                                        <th>{singleProduct._id}</th>
                                        <td>{singleProduct.name}</td>
                                        <td>{singleProduct.originalPrice}</td>
                                        <td>{singleProduct.stock}</td>
                                        <td>{singleProduct.sold_out}</td>
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

export default AllProducts;