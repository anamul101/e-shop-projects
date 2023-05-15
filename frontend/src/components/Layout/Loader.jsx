import React from "react";
// import Lottie from "react-lottie";
import { useLottie } from "lottie-react";
import animationData from "../../Assests/24151-ecommerce-animation.json";

const Loader = () => {
  const options = {
    loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
  };

  const { View } = useLottie(options);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div options={options} width={300} height={300}>{View}</div>
    </div>
  )
};

export default Loader;