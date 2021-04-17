import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import emptyImg from '../assets/empty.svg';
import { deleteProduct, getProductList } from '../redux/actions/productActions';
import Loader from '../components/Loader';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  const { user: userLogin } = useSelector(state => state.userLogin);
  const { products, pages: totalPage, loading } = useSelector(
    state => state.productList
  );
  const { success: deleteProductSuccess } = useSelector(
    state => state.productDelete
  );

  useEffect(() => {
    if (!userLogin?.isAdmin) {
      navigate('/profile');
    } else {
      dispatch(getProductList('', pageNumber));
    }
  }, [dispatch, navigate, userLogin, pageNumber, deleteProductSuccess]);

  useEffect(() => {
    if (!totalPage) {
      setPages(page => page);
    } else {
      setPages(totalPage);
    }
  }, [totalPage]);

  const pageHandler = page => {
    setPageNumber(Number(page.selected + 1));
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:space-y-0 space-y-3 sm:items-center sm:justify-between pb-3 border-b-2 mb-5'>
        <h3 className='text-gray-800 text-2xl font-medium'>Product Details</h3>
        {loading && <Loader />}
        <button
          className='bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 transition-colors duration-300 flex items-center'
          onClick={() => navigate('/profile/products/create')}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
          &nbsp;&nbsp; <span>Add product</span>
        </button>
      </div>
      {products?.length === 0 ? (
        <div className='space-y-10'>
          <div className='flex justify-center items-center mt-20'>
            <img src={emptyImg} width='250' height='250' alt='' />
          </div>
          <h4 className='text-center text-lg lg:text-xl text-gray-700'>
            Sorry, products not found
          </h4>
        </div>
      ) : (
        <div className='overflow-x-auto mt-6'>
          <motion.table
            exit={{ opacity: 0 }}
            variants={stagger}
            initial='hidden'
            animate='visible'
            className='table-auto border-collapse w-full'
          >
            <thead>
              <tr
                className='rounded-lg text-sm font-medium text-gray-700 text-left'
                style={{ backgroundColor: '#f8f8f8' }}
              >
                <th className='px-4 py-2 whitespace-nowrap'>Picture</th>
                <th className='px-4 py-2 whitespace-nowrap'>Name</th>
                {/* <th className='px-4 py-2 whitespace-nowrap'>Brand</th>
                <th className='px-4 py-2 whitespace-nowrap'>Category</th> */}
                <th className='px-4 py-2 whitespace-nowrap'>Stock</th>
                <th className='px-4 py-2 whitespace-nowrap'>Price</th>
                <th className='px-4 py-2 whitespace-nowrap'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-sm font-normal text-gray-700'>
              {products?.map(product => (
                <tr
                  className='hover:bg-gray-100 border-b border-gray-200 py-10'
                  key={product._id}
                >
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <img
                      src={product.image}
                      alt=''
                      className='w-10 h-10 rounded-md'
                    />
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {product.name}
                  </td>
                  {/* <td className='px-4 py-4 whitespace-nowrap'>{product.brand}</td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {product.category}
                  </td> */}
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {product.countInStock > 0 ? (
                      <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>In stock</span>
                      </span>
                    ) : (
                      <span className='relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
                        <span
                          aria-hidden
                          className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative text-xs'>Out of stock</span>
                      </span>
                    )}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    {product.price}
                  </td>
                  <td className='px-4 py-4 whitespace-nowrap'>
                    <div className='flex items-center space-x-3'>
                      <button
                        className='px-4 py-2 bg-gray-100 hover:bg-white'
                        onClick={() =>
                          navigate(`/profile/products/${product._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className='px-4 py-2 bg-red-500 text-white hover:bg-red-400 transition-colors duration-300'
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure to delete this product?'
                            )
                          ) {
                            dispatch(deleteProduct(product?._id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          {pages > 1 && (
            <div className='text-center md:text-right'>
              <div className='bg-gray-100 my-10 px-3 py-3 inline-block rounded-md'>
                <ReactPaginate
                  previousLabel={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 px-4 box-content'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  }
                  nextLabel={
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 px-4 box-content'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  }
                  pageCount={pages}
                  onPageChange={pageHandler}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={4}
                  containerClassName={'text-lg flex space-x-3'}
                  previousLinkClassName={'outline-none rounded-md'}
                  pageLinkClassName={'px-4 outline-none'}
                  nextLinkClassName={'outline-none rounded-md'}
                  activeClassName={'bg-gray-50 border text-indigo-600'}
                  disabledClassName={'opacity-20'}
                  breakLabel={'...'}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductListScreen;
