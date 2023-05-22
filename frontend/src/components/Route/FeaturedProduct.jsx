import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
// import { productData } from "../../static/data";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  const {products} = useSelector((state) => state.products);
  console.log(products)
   
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            products && products.map((i, index) => <ProductCard data={i} key={index} />)
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;