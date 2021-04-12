import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Rating, StockAlert } from '../components';
import Loader from '../components/Loader';
import { addToCart } from '../redux/actions/cartActions';
import { getProductDetails } from '../redux/actions/productActions';

const ProductScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const productId = params.id;
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.productDetails);

  useEffect(() => dispatch(getProductDetails(productId)), [
    dispatch,
    productId,
  ]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, quantity));
    navigate(`/cart/${productId}?qty=${quantity}`);
  };

  return (
    <div className='space-y-5 divide-y divide-gray-100'>
      {loading && <Loader />}
      <div className='grid gap-14 md:grid-cols-2 pb-10'>
        <img
          src={product?.image}
          alt=''
          className='mx-auto max-w-sm md:max-w-md'
        />
        <div className='mx-auto max-w-sm md:max-w-full'>
          <span className='text-md text-gray-500'>
            {product?.category.toUpperCase()}
          </span>
          <h2 className='text-5xl text-gray-700 mt-5 mb-3'>{product?.name}</h2>
          <div className='divide-y-2 divide-gray-100'>
            <div className='flex items-center space-x-5'>
              <Rating value={product?.rating} />
              <span className='text-gray-400 text-base font-light'>
                {product?.numReviews} Reviews
              </span>
            </div>
            <div className='flex items-center space-x-5 mt-5 pt-5 mb-7'>
              <h3 className='text-4xl'>${product?.price}</h3>
              <StockAlert inStock={product?.countInStock > 0} />
            </div>
          </div>
          <p className='text-gray-500 prose'>{product?.description}</p>
          <div className='flex items-center space-x-5 mt-10'>
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
        </div>
      </div>
      <div className='pt-5 mx-auto max-w-sm md:max-w-full'>
        <div className='grid gap-10 md:grid-cols-2 '>
          <div>
            <h3 className='text-gray-700 text-2xl mb-10'>
              Ratings & Reviews of {product?.name}
            </h3>
            <div className='divide-y divide-gray-200'>
              <div className='space-y-3'>
                <div className='flex items-center space-x-5'>
                  <img
                    src='https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg'
                    alt=''
                    className='w-10'
                  />
                  <div>
                    <h2>Hasib Molla</h2>
                    <Rating value={product?.rating} />
                  </div>
                </div>
                <p className='prose max-w-lg'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
                  enim!
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className='text-gray-700 text-2xl mb-10'>
              Write a customer review
            </h3>
            <form>
              <div className='flex flex-col space-y-5'>
                <select
                  className='w-full lg:w-2/3 border-none bg-gray-100 rounded-md focus:ring-purple-100'
                  name='quantity'
                  id='quantity'
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
                />
                <button className='w-40 bg-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-200 text-white px-5 py-2 rounded-md transition-shadow duration-300'>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
