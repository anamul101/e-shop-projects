import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductsDetails from '../components/Products/ProductsDetails';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const {allProducts} = useSelector((state) => state.products);
    const { name } = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, " ");
    useEffect(() => {
        const data =allProducts && allProducts.find((i) => i.name === productName);
        setData(data)
    }, [])
    return (
        <div>
            <Header />
            <ProductsDetails data={data} />
            {
                // !eventData && (
                    <>
                        {data && <SuggestedProduct data={data} />}
                    </>
                // )
            }
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;