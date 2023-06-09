import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { backend_url } from '../../server'
import { BsHandbag } from 'react-icons/bs'
import { GrWorkshop } from 'react-icons/gr'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { CiMoneyBill } from 'react-icons/ci'

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-[#054349] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-products" className="800px:block hidden">
            <BsHandbag
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-orders" className="800px:block hidden">
            <FiShoppingBag
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-withdraw-request" className="800px:block hidden">
            <CiMoneyBill
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-sellers" className="800px:block hidden">
            <GrWorkshop color="#fff" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/admin-users" className="800px:block hidden">
            <HiOutlineUserGroup
              color="#fff"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/profile">
            <img
              src={`${backend_url}${user?.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader