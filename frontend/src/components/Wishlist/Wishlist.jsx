import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import styles from '../../styles/styles';
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
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
                            onClick={() => setOpenWishlist(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.noramlFlex} p-4`}>
                        <AiOutlineHeart size={25} />
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
                <RxCross1
                    className="cursor-pointer"
                />
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpArrqyigoFD8rQEgw4frhq8WCGz7zglbMYx5tOOiENg&s'
                    alt=""
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <div>
                    <BsCartPlus
                        size={20} className="cursor-pointer" title="Add to Cart"
                    />
                </div>
            </div>
        </div>
    )
}

export default Wishlist;