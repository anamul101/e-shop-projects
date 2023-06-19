import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useLottie } from "lottie-react";
import animationData from "../Assests/97660-payment-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
const defaultOptions = {
  loop:true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};
const { View } = useLottie(defaultOptions);
  return (
    <div>
      <h5 className="text-center text-[25px] text-[#000000a1]">
      <div options={defaultOptions} width={200} height={200}>{View}</div>
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;