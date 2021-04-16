import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Meta, Rating, StockAlert } from '../components';
import Loader from '../components/Loader';
import { addToCart } from '../redux/actions/cartActions';
import {
  createProductReview,
  getProductDetails,
} from '../redux/actions/productActions';

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const productId = params.id;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const { user } = useSelector(state => state.userLogin);
  const {
    success: reviewCreatedSuccess,
    loading: reviewCreatedLoading,
  } = useSelector(state => state.productReviewCreate);
  const { product, loading } = useSelector(state => state.productDetails);

  useEffect(() => dispatch(getProductDetails(productId)), [
    dispatch,
    productId,
    reviewCreatedSuccess,
  ]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, quantity));
    navigate(`/cart/${productId}?qty=${quantity}`);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return loading ? (
    <Loader />
  ) : (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='space-y-5 divide-y divide-gray-100'
    >
      <Meta title={product?.name} />
      {reviewCreatedLoading && <Loader />}
      <div className='grid gap-14 md:grid-cols-2 pb-10'>
        <motion.img
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
          src={product?.image}
          alt=''
          className='mx-auto w-full max-w-md'
        />
        <motion.div
          className='mx-auto max-w-sm md:max-w-full'
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.3,
                duration: 0.3,
                delay: 0.3,
              },
            },
          }}
          initial='hidden'
          animate='visible'
        >
          <span className='text-md text-gray-500'>
            {product?.category.toUpperCase()}
          </span>
          <h2 className='text-4xl md:text-5xl text-gray-700 mt-5 mb-3'>
            {product?.name}
          </h2>
          <div className='divide-y-2 divide-gray-100'>
            <div className='flex items-center space-x-5'>
              <Rating value={product?.rating} />
              <span className='text-gray-400 text-base font-light'>
                {product?.numReviews} Reviews
              </span>
            </div>
            <div className='flex items-center space-x-5 mt-5 pt-5 mb-7'>
              <h3 className='text-2xl md:text-3xl'>${product?.price}</h3>
              <StockAlert inStock={product?.countInStock > 0} />
            </div>
          </div>
          <p className='text-gray-500 prose'>{product?.description}</p>
          <div className='flex md:flex-row flex-col md:items-center space-y-5 md:space-y-0 md:space-x-5 mt-10'>
            {product?.countInStock > 0 && (
              <div className='space-x-3'>
                <span className='font-semibold'>Quantity</span>
                <select
                  className='text-center border-none bg-gray-100 rounded-md focus:ring-purple-100'
                  name='quantity'
                  id='quantity'
                  onChange={e => setQuantity(Number(e.target.value))}
                >
                  {[...Array(product?.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className={`${
                product?.countInStock === 0 && 'opacity-50 pointer-events-none'
              } w-40 bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 rounded-md transition-shadow duration-300`}
              disabled={product?.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='pt-5 mx-auto max-w-sm md:max-w-full'
      >
        <div className='grid gap-10 md:grid-cols-2 '>
          <div>
            <h3 className='text-gray-700 text-2xl mb-10'>
              Ratings & Reviews of {product?.name}
            </h3>
            {product?.numReviews === 0 && (
              <h4 className='text-red-400'>
                This product has no reviews. <br /> Let others know what do you
                think and be the first to write a review.
              </h4>
            )}
            <div className='divide-y divide-gray-200'>
              {product?.reviews.map(review => (
                <motion.div
                  key={review?._id}
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.5 },
                    },
                  }}
                  initial='hidden'
                  animate='visible'
                  className='space-y-3'
                >
                  <div className='flex items-center space-x-5'>
                    <img src={review?.avatar} alt='' className='w-10' />
                    <div>
                      <h2>{review?.name}</h2>
                      <Rating value={review?.rating} />
                    </div>
                  </div>
                  <p className='prose max-w-lg'>{review?.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {user ? (
            <div>
              <h3 className='text-gray-700 text-2xl mb-10'>
                Write a customer review
              </h3>
              <form {...{ onSubmit }}>
                <div className='flex flex-col space-y-5'>
                  <select
                    className='w-full lg:w-2/3 border-none bg-gray-100 rounded-md focus:ring-purple-100'
                    name='quantity'
                    id='quantity'
                    required
                    onChange={e => setRating(e.target.value)}
                  >
                    <option value=''>Select Rating...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </select>
                  <textarea
                    className='w-full lg:w-2/3 border-none focus:ring-gray-200 transition-shadow duration-500 rounded-md bg-gray-100 px-5 overflow-hidden'
                    type='text'
                    placeholder='Comment'
                    onChange={e => setComment(e.target.value)}
                    required
                  />
                  <button className='w-40 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 rounded-md transition-shadow duration-300'>
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <h3 className='text-gray-700 text-lg mb-10'>
              Please{' '}
              <Link to='/login' className='text-blue-500 hover:underline'>
                Sign in
              </Link>{' '}
              to write a review
            </h3>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductScreen;
