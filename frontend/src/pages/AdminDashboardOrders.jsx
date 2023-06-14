import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);
  
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
            <div className="w-[97%] flex justify-center">
            <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>status</th>
                                    <th>itemsQty</th>
                                    <th>total</th>
                                    <th>createdAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adminOrders && adminOrders.map((item) =>
                                        <tr>
                                            <th>{item._id}</th>
                                            <td><p>{item.status}</p></td>
                                            <td>{item?.cart?.reduce((acc, item) => acc + item.qty, 0)}</td>
                                            <td>{item.totalPrice}</td>
                                            <td>{item.createdAt.slice(0, 10)}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;