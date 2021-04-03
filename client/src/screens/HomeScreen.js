import React from 'react';
import { Banner } from '../components';
import ProductCard from '../components/Card/ProductCard';
import { products } from '../data';

const HomeScreen = () => {
  return (
    <>
      <Banner />
      <h1 className='text-3xl font-semibold text-gray-700 mb-10'>
        Our Latest Products
      </h1>
      <div className='grid gap-10 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
