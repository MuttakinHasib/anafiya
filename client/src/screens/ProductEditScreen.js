import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import {
  getProductDetails,
  updateProduct,
} from '../redux/actions/productActions';

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [disableEdit, setDisableEdit] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { user: userLogin } = useSelector(state => state.userLogin);
  const { product } = useSelector(state => state.productDetails);
  const { success: productUpdateSuccess } = useSelector(
    state => state.productUpdate
  );

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!userLogin || !userLogin?.isAdmin) {
      navigate('/profile');
    } else {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId, userLogin, navigate, productUpdateSuccess]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

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
      dispatch(
        updateProduct(product?._id, {
          name,
          price,
          description,
          image: data.url,
          brand,
          category,
          countInStock,
        })
      );

      setUploading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Submit form handler

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      updateProduct(product?._id, {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      })
    );
    setDisableEdit(true);
  };

  return (
    <>
      {uploading && <Loader />}
      <div className='flex items-center justify-between pb-3 border-b-2 mb-5'>
        <h3 className='text-gray-800 text-xl font-medium'>Product Details</h3>
        {disableEdit && (
          <button
            className='text-purple-900 transition-colors duration-300 flex items-center'
            onClick={() => setDisableEdit(!disableEdit)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
            &nbsp; <span>Edit</span>
          </button>
        )}
      </div>

      <div className='max-w-lg'>
        <form className='space-y-3' {...{ onSubmit }}>
          <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5'>
            <div className='relative w-24 h-24 rounded-xl img-container overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-full img-overlay'></div>
              <img
                src={product?.image}
                alt=''
                className='w-full h-full object-cover block'
              />
              <label
                htmlFor='upload-product'
                className='flex justify-center w-full upload-btn text-white h-1/3 absolute -bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-40 cursor-pointer transition-transform duration-300 text-sm'
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
                  disabled={disableEdit}
                  id='name'
                  name='name'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
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
                  disabled={disableEdit}
                  id='brand'
                  name='brand'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
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
                  disabled={disableEdit}
                  id='category'
                  name='category'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
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
                  disabled={disableEdit}
                  id='price'
                  name='price'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
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
                  disabled={disableEdit}
                  id='countInStock'
                  name='countInStock'
                  className={
                    'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                    (!disableEdit ? ' border-gray-300' : ' border-transparent')
                  }
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
                className={
                  'text-gray-600 px-4 rounded-md bg-gray-100 w-full' +
                  (!disableEdit ? ' border-gray-300' : ' border-transparent')
                }
                rows={5}
                disabled={disableEdit}
                placeholder='Enter description'
                name='description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          {!disableEdit && (
            <div className='flex items-center space-x-5'>
              <button
                type='button'
                className='rounded-md border-2 px-5 py-2 text-gray-700 font-light hover:bg-gray-50 transition-colors duration-300'
                onClick={() => setDisableEdit(true)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='rounded-md bg-gray-800 px-5 py-2 text-white font-light hover:bg-gray-700 transition-colors duration-300'
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProductEditScreen;
