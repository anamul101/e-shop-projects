import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
    AiOutlineArrowRight,
    AiOutlineCamera,
    AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
// import { Button } from "@material-ui/core";
// import { DataGrid } from '@mui/x-data-grid';
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { deleteUserAddress, loadUser, updatUserAddress, updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-hot-toast"
import axios from "axios";
import { Country, State } from "country-state-city"
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { MdTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
    const { user, error, successMessage } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: "clearMessages" });
        }
    }, [error, successMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber, password));
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();

        formData.append("image", e.target.files[0]);

        await axios
            .put(`${server}/user/update-avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            .then((response) => {
                //  dispatch(loadUser());
                //  toast.success("avatar updated successfully!");
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error);
            });

    }
    return (
        <div className="w-full">
            {/* profile */}
            {
                active === 1 && (
                    <>
                        <div className="flex justify-center w-full">
                            <div className="relative">
                                <img
                                    src={`${backend_url}${user?.avatar}`}
                                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                                    alt=""
                                />
                                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImage}
                                    />
                                    <label htmlFor="image">
                                        <AiOutlineCamera />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full px-5">
                            <form onSubmit={handleSubmit} aria-required={true}>
                                <div className="w-full 800px:flex block pb-3">
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Full Name</label>
                                        <input
                                            type="text"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Email Address</label>
                                        <input
                                            type="text"
                                            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="w-full 800px:flex block pb-3">
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Phone Number</label>
                                        <input
                                            type="number"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>

                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Enter your password</label>
                                        <input
                                            type="password"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <input
                                    className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                    required
                                    value="Update"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </>
                )
            }
            {/* order */}
            {active === 2 && (
                <div>
                    <AllOrders />
                </div>
            )}

            {/* Refund */}
            {active === 3 && (
                <div>
                    <AllRefundOrders />
                </div>
            )}

            {/* Track order */}
            {active === 5 && (
                <div>
                    <TrackOrder />
                </div>
            )}

            {/* Change Password */}
            {active === 6 && (
                <div>
                    <ChangePassword />
                </div>
            )}

            {/*  user Address */}
            {active === 7 && (
                <div>
                    <Address />
                </div>
            )}
        </div>
    );
};

const AllOrders = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    }, [])


    return (
        <>
            <div className="pl-8 pt-1">
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
                                orders && orders.map((singleOrder)=>
                                <tr>
                                    <th>{singleOrder._id}</th>
                                    <td><p className="text-green-600">{singleOrder.status}</p></td>
                                    <td>{singleOrder.cart.length}</td>
                                    <td>USD${singleOrder.totalPrice}</td>
                                    <td>
                                        <button className="hover:background-gray-400">
                                        <Link to={`/user/order/${singleOrder._id}`}>
                                            <AiOutlineArrowRight size={20}/>
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
        </>
    )
}
const AllRefundOrders = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    }, [])
    const eligibleOrders = orders && orders.filter((item)=>item.status === "Processing refund")
    return (
        <div className="pl-8 pt-1">
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
                               eligibleOrders && eligibleOrders.map((singleOrder)=>
                                <tr>
                                    <th>{singleOrder._id}</th>
                                    <td><p className="text-green-600">{singleOrder.status}</p></td>
                                    <td>{singleOrder.cart.length}</td>
                                    <td>USD${singleOrder.totalPrice}</td>
                                    <td>
                                        <button className="hover:background-gray-400">
                                        <Link to={`/user/order/${singleOrder._id}`}>
                                            <AiOutlineArrowRight size={20}/>
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
    )
}
const TrackOrder = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id))
    }, [])


    return (
        <>
            <div className="pl-8 pt-1">
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
                                orders && orders.map((singleOrder)=>
                                <tr>
                                    <th>{singleOrder._id}</th>
                                    <td><p className="text-green-600">{singleOrder.status}</p></td>
                                    <td>{singleOrder.cart.length}</td>
                                    <td>USD${singleOrder.totalPrice}</td>
                                    <td>
                                        <button className="hover:background-gray-400">
                                        <Link to={`/user/track/order/${singleOrder._id}`}>
                                            <MdTrackChanges size={20}/>
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
        </>
    )
}
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordChangeHandler = async (e) => {
        e.preventDefault();

        await axios
            .put(
                `${server}/user/update-user-password`,
                { oldPassword, newPassword, confirmPassword },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success(res.data.success);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };
    return (
        <div className="w-full px-5">
            <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
                Change Password
            </h1>
            <div className="w-full">
                <form
                    aria-required
                    onSubmit={passwordChangeHandler}
                    className="flex flex-col items-center"
                >
                    <div className=" w-[100%] 800px:w-[50%] mt-5">
                        <label className="block pb-2">Enter your old password</label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className=" w-[100%] 800px:w-[50%] mt-2">
                        <label className="block pb-2">Enter your new password</label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className=" w-[100%] 800px:w-[50%] mt-2">
                        <label className="block pb-2">Enter your confirm password</label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                            required
                            value="Update"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
const Address = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const addressTypeData = [
        {
            name: "Default",
        },
        {
            name: "Home",
        },
        {
            name: "Office",
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!");
        } else {
            dispatch(
                updatUserAddress(
                    country,
                    city,
                    address1,
                    address2,
                    zipCode,
                    addressType
                )
            );
            setOpen(false);
            setCountry("");
            setCity("");
            setAddress1("");
            setAddress2("");
            setZipCode(null);
            setAddressType("");
        }
    };

    const handleDelete = (item) => {
        const id = item._id;
        dispatch(deleteUserAddress(id));
    };
    return (
        <div className="w-full px-5">
            {/* handel popop */}
            {open && (
                <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
                    <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
                        <div className="w-full flex justify-end p-3">
                            <RxCross1
                                size={30}
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <h1 className="text-center text-[25px] font-Poppins">
                            Add New Address
                        </h1>
                        <div className="w-full">
                            <form aria-required onSubmit={handleSubmit} className="w-full">
                                <div className="w-full block p-4">
                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Country</label>
                                        <select
                                            name=""
                                            id=""
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block border pb-2">
                                                choose your country
                                            </option>
                                            {Country &&
                                                Country.getAllCountries().map((item) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={item.isoCode}
                                                        value={item.isoCode}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Choose your City</label>
                                        <select
                                            name=""
                                            id=""
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block border pb-2">
                                                choose your city
                                            </option>
                                            {State &&
                                                State.getStatesOfCountry(country).map((item) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={item.isoCode}
                                                        value={item.isoCode}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address 1</label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address1}
                                            onChange={(e) => setAddress1(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address 2</label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address2}
                                            onChange={(e) => setAddress2(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Zip Code</label>
                                        <input
                                            type="number"
                                            className={`${styles.input}`}
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address Type</label>
                                        <select
                                            name=""
                                            id=""
                                            value={addressType}
                                            onChange={(e) => setAddressType(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block border pb-2">
                                                Choose your Address Type
                                            </option>
                                            {addressTypeData &&
                                                addressTypeData.map((item) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={item.name}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className=" w-full pb-2">
                                        <input
                                            type="submit"
                                            className={`${styles.input} mt-5 cursor-pointer`}
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    My Addresses
                </h1>
                <div
                    className={`${styles.button} !rounded-md`}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br />
            {user &&
                user.addresses.map((item, index) => (
                    <div
                        className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
                        key={index}
                    >
                        <div className="flex items-center">
                            <h5 className="pl-5 font-[600]">{item.addressType}</h5>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6 className="text-[12px] 800px:text-[unset]">
                                {item.address1} {item.address2}
                            </h6>
                        </div>
                        <div className="pl-8 flex items-center">
                            <h6 className="text-[12px] 800px:text-[unset]">
                                {user && user.phoneNumber}
                            </h6>
                        </div>
                        <div className="min-w-[10%] flex items-center justify-between pl-8">
                            <AiOutlineDelete
                                size={25}
                                className="cursor-pointer"
                                onClick={() => handleDelete(item)}
                            />
                        </div>
                    </div>
                ))}

            {user && user.addresses.length === 0 && (
                <h5 className="text-center pt-8 text-[18px]">
                    You not have any saved address!
                </h5>
            )}
        </div>
    );
};

export default ProfileContent;