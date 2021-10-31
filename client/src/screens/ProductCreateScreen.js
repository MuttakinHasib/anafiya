import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import { createProduct } from '../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/actions/types';

const ProductCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const { user: userLogin } = useSelector(state => state.userLogin);
  const {
    success: productCreateSuccess,
    loading: productCreateLoading,
  } = useSelector(state => state.productCreate);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(
    'https://res.cloudinary.com/muttakinhasib/image/upload/v1618421868/products/woocommerce-placeholder-600x600_rnyd9c.png'
  );
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userLogin || !userLogin?.isAdmin) {
      navigate('/profile');
    } else {
      if (productCreateSuccess) {
        navigate('/');
        dispatch({ type: PRODUCT_CREATE_RESET });
      }
    }
  }, [dispatch, userLogin, navigate, productCreateSuccess]);

  // Upload Avatar Handler

  const handleProductImage = async e => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('product', file);

    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userLogin.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload/product`,
        formData,
        config
      );
      setImage(data.url);
      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Submit form handler

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      })
    );
  };

  return (
    <>
      {(uploading || productCreateLoading) && <Loader />}

      <h3 className='text-gray-800 text-xl font-medium pb-3 border-b-2 mb-5'>
        Create New Product
      </h3>

      <div className='max-w-lg'>
        <form className='space-y-3' {...{ onSubmit }}>
          <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
            <div className='relative w-24 h-24 rounded-xl img-container overflow-hidden border-2 border-gray-200 border-dashed'>
              <div className='absolute top-0 left-0 w-full h-full img-overlay'></div>
              <img
                src={image}
                alt=''
                className='w-full h-full object-cover block'
              />
              <label
                htmlFor='upload-product'
                className='flex justify-center w-full upload-btn text-white h-1/3 absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm'
                style={{ color: '#fff !important' }}
              >
                change
                <input
                  type='file'
                  id='upload-product'
                  name='product'
                  className='opacity-0 cursor-pointer absolute top-0 left-0'
                  onChange={handleProductImage}
                />
              </label>
            </div>
            <div className='flex-1'>
              <label
                htmlFor='name'
                className='font-semibold text-gray-700 block pb-2'
              >
                Product title
              </label>
              <div className='flex'>
                <input
                  id='name'
                  name='name'
                  className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300'
                  type='text'
                  value={name}
                  placeholder='Enter product title'
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5'>
            <div className='w-full'>
              <label
                htmlFor='brand'
                className='font-semibold text-gray-700 block pb-2'
              >
                Brand
              </label>
              <div className='flex'>
                <input
                  id='brand'
                  name='brand'
                  className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-300'
                  type='text'
                  value={brand}
                  placeholder='Enter product brand'
                  onChange={e => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='category'
                className='font-semibold text-gray-700 block pb-2'
              >
                Category
              </label>
              <div className='flex'>
                <input
                  id='category'
                  name='category'
                  className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200'
                  type='text'
                  value={category}
                  placeholder='Product count in stock'
                  onChange={e => setCategory(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5'>
            <div className='w-full'>
              <label
                htmlFor='price'
                className='font-semibold text-gray-700 block pb-2'
              >
                Price
              </label>
              <div className='flex'>
                <input
                  id='price'
                  name='price'
                  className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200'
                  type='text'
                  value={price}
                  placeholder='Enter product price'
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='countInStock'
                className='font-semibold text-gray-700 block pb-2'
              >
                Count in Stock
              </label>
              <div className='flex'>
                <input
                  id='countInStock'
                  name='countInStock'
                  className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200'
                  type='text'
                  value={countInStock}
                  placeholder='Product count in stock'
                  onChange={e => setCountInStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='description'
              className='font-semibold text-gray-700 block pb-2'
            >
              Description
            </label>
            <div className='flex'>
              <textarea
                className='text-gray-600 px-4 rounded-md bg-gray-100 w-full border-gray-200'
                rows={5}
                placeholder='Enter description'
                name='description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            type='submit'
            className='rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300'
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductCreateScreen;
