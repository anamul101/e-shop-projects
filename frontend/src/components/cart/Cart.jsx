import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import styles from '../../styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Cart = ({ setOpenCart }) => {
    const cartData = [
        {
            name: 'Iphone 14 mpro max 255 bg and 8gb ram sliver color',
            description: 'test',
            price: 999,
        },
        {
            name: 'Iphone 14 mpro max 255 bg and 8gb ram sliver color',
            description: 'test',
            price: 909,
        },
        {
            name: 'Iphone 14 mpro max 255 bg and 8gb ram sliver color',
            description: 'test',
            price: 388,
        },
    ]
    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
                <div> 
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            size={25}
                            className="cursor-pointer"
                            onClick={() => setOpenCart(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
                    </div>
                    {/* cart Single Items */}
                    <br />
                    <div className="w-full border-t">
                        {cartData &&
                            cartData.map((i, index) => (
                                <CartSingle
                                    key={index}
                                    data={i}
                                />
                            ))}
                    </div>
                </div>
                <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$1000)
                  </h1>
                </div>
              </Link>
            </div>
            </div>
        </div>
    );
};

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;
    return (
        <div className='border-b p-4'>
            <div className='w-full flex items-center'>
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => setValue(value + 1)}
                    >
                        <HiPlus size={18} color="#fff" />
                    </div>

                    <span className="pl-[10px]">{value}</span>
                    <div
                        className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => setValue(value === 1 ? 1 : value - 1)}
                    >
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpArrqyigoFD8rQEgw4frhq8WCGz7zglbMYx5tOOiENg&s'
                    alt=""
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        ${data.price} * {value}
                    </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1
                    className="cursor-pointer"
                    // onClick={() => removeFromCartHandler(data)}
                />
            </div>
        </div>
    )
}

export default Cart;