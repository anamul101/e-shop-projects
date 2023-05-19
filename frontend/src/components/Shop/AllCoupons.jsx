import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import axios from "axios";

const AllCoupons = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coupouns, setCoupouns] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [value, setValue] = useState(null);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);


    // const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`${server}/coupon/get-coupon/${seller._id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setIsLoading(false);
            setCoupouns(res.data.couponCodes);
          })
          .catch((error) => {
            setIsLoading(false);
          });
    }, [seller._id]);

    const handleDelete = (id) => {
        axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true}).then((res) => {
            toast.success("Coupon code deleted succesfully!")
          })
          window.location.reload();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
          .post(
            `${server}/coupon/create-coupon-code`,
            {
              name,
              minAmount,
              maxAmount,
              selectedProducts,
              value,
              shopId: seller._id,
            },
            { withCredentials: true }
          )
          .then((res) => {
           toast.success("Coupon code created successfully!");
           setOpen(false);
           window.location.reload();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1  mt-10 bg-white">
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
                            onClick={() => setOpen(true)}
                        >
                            <span className="text-white">Create Coupon Code</span>
                        </div>
                    </div>

                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Coupon Id</th>
                                        <th>Coupon Name</th>
                                        <th>Price</th>
                                        <th>ShopId</th>
                                        {/* <th>Min Amount</th>
                                        <th>Max Amount</th> */}
                                        <th>Preview</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        coupouns && coupouns.map((coupoun) =>
                                            <tr>
                                                <th>{coupoun._id}</th>
                                                <td>{coupoun.name}</td>
                                                <td>{coupoun.value}%</td>
                                                <td>{coupoun.shopId}</td>
                                                {/* <td>{coupoun? coupoun.minAmount:"0"}</td> */}
                                                {/* <td>{coupoun?coupoun.maxAmount:"0"}</td> */}
                                                <td>
                                                    <Link to={`/product/${coupoun._id}`}>
                                                        <button>
                                                            <AiOutlineEye size={20} />
                                                        </button>
                                                    </Link>

                                                </td>
                                                <td>
                                                    <button onClick={() => handleDelete(coupoun._id)}>
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
                        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center overflow-hidden">
                            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                                <div className="w-full flex justify-end">
                                    <RxCross1
                                        size={30}
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <h5 className="text-[30px] font-Poppins text-center">
                                    Create Coupon code
                                </h5>
                                {/* create coupoun code */}
                                <form onSubmit={handleSubmit} ariarequired={true}>
        
                                    <div>
                                        <label className="pb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your coupon code name..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">
                                            Discount Percentenge{" "}
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="value"
                                            value={value}
                                            required
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Enter your coupon code value..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Min Amount</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={minAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setMinAmout(e.target.value)}
                                            placeholder="Enter your coupon code min amount..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Max Amount</label>
                                        <input
                                            type="number"
                                            name="value"
                                            value={maxAmount}
                                            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setMaxAmount(e.target.value)}
                                            placeholder="Enter your coupon code max amount..."
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <label className="pb-2">Selected Product</label>
                                        <select
                                            className="w-full mt-2 border h-[35px] rounded-[5px]"
                                            value={selectedProducts}
                                            onChange={(e) => setSelectedProducts(e.target.value)}
                                        >
                                            <option value="Choose your selected products">
                                                Choose a selected product
                                            </option>
                                            {products &&
                                                products.map((i) => (
                                                    <option value={i.name} key={i.name}>
                                                        {i.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <input
                                            type="submit"
                                            value="Create"
                                            className="mt-2 cursor-pointer appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AllCoupons;