import React, { useEffect, useState } from "react";
// import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";


const SuggestedProduct = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productData,setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
    dispatch(getAllProducts());
  }, [dispatch,allProducts,data.category]);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                productData && productData.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;