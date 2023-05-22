import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
// import { productData } from "../../static/data";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../redux/actions/product";

const FeaturedProduct = () => {
  const {allProducts} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [ dispatch]);
   
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;