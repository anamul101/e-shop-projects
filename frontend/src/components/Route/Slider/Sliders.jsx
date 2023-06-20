import { useEffect, useState } from "react";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.css";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Sliders = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider">
      {/* <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} /> */}

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  {/* <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a> */}
                   <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sliders;