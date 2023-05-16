import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllProducts from '../../components/Shop/AllProducts'

const ShopAllProducts = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="w-full justify-between flex">
                <div className="w-[80px] 800px:w-[330px]  items-center  ">
                    <DashboardSideBar active={3} />
                </div>
                <div className="w-full justify-between flex mt-8">
                    <AllProducts />
                </div>
            </div>
        </div>
    )
}

export default ShopAllProducts;