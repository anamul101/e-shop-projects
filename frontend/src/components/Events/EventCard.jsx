import React from "react";
import CountDown from "./CountDown";
// import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const EventCard = ({ active, data }) => {
    // const addToCartHandler=()=>{

    // }
    return (
        <div
            className={`w-full block bg-white rounded-lg ${active ? "unset" : "mb-12"
                } lg:flex p-2`}
        >
            <div className="w-full lg:-w[50%] m-auto">
                <img className="w-[70%]" src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-gold-220907_inline.jpg.large.jpg' alt="" />
            </div>
            <div className="w-full lg:[w-50%] flex flex-col justify-center">
                <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolorum quasi, esse dolore alias laboriosam commodi in. Id commodi enim cumque, fuga quasi est, distinctio iure quis vero accusamus laborum!</p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                            1099$
                        </h5>
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                            999$
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                        120 sold
                    </span>
                </div>
                <CountDown data={data} />
                {/* <br />
                <div className="flex items-center">
                    <Link to={`/product/${data._id}?isEvent=true`}>
                        <div className={`${styles.button} text-[#fff]`}>See Details</div>
                    </Link>
                    <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)}>Add to cart</div>
                </div> */}
            </div>
        </div>
    );
};

export default EventCard;