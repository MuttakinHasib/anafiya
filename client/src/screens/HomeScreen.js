import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banner } from '../components';
import ProductCard from '../components/Card/ProductCard';
import Loader from '../components/Loader';
import { getProductList } from '../redux/actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.productList);
  const { success: productCreated } = useSelector(state => state.productCreate);

  useEffect(() => dispatch(getProductList()), [dispatch, productCreated]);

  return (
    <>
      {/* {loading && <Loader />} */}
      <Banner />
      <h1 className='text-3xl font-semibold text-gray-700 mb-10'>
        Our Latest Products
      </h1>
      <div
        // layout
        className='grid gap-10 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.8 }}
      >
        {products?.map(product => (
          <ProductCard key={product?._id} {...{ product }} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
