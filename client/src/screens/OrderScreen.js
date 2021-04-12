import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { Alert } from '../components';
import Loader from '../components/Loader';
import {
  orderDetails,
  orderPaid,
  stripePayment,
} from '../redux/actions/orderActions';

const OrderScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderId = params.id;

  const { user } = useSelector(state => state.userLogin);
  const { order, loading } = useSelector(state => state.orderDetails);
  const { paymentResult, success: stripePaymentSuccess } = useSelector(
    state => state.stripePayment
  );
  const { success: orderPaidSuccess } = useSelector(state => state.orderPay);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (stripePaymentSuccess) {
        dispatch(orderPaid(orderId, paymentResult));
      }
      dispatch(orderDetails(orderId));
    }
  }, [dispatch, user, navigate, stripePaymentSuccess, paymentResult, orderId]);

  useEffect(() => {
    if (orderPaidSuccess) {
      dispatch(orderDetails(orderId));
      navigate(`/order/${orderId}/success`);
    }
  }, [dispatch, orderId, orderPaidSuccess, navigate]);
  // useEffect(() => {}, []);
  const onToken = async token => {
    try {
      const payload = {
        amount: Math.floor(order?.totalPrice) * 100,
        shippingAddress: order?.shippingAddress,
        token,
      };
      dispatch(stripePayment(payload));
    } catch (err) {
      console.error(err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <h2 className='text-center text-2xl text-green-500'>
        Order No #{order?._id}
      </h2>
      <div className='grid gap-12 lg:grid-cols-3 mt-12 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-full mx-auto'>
        <div className='lg:col-span-2 space-y-7'>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Shipping Details</h2>
            <div className='border-2 border-gray-200 hover:bg-blue-400 hover:bg-opacity-5 rounded-md p-8'>
              <h4 className='text-lg text-gray-700'>
                Name: {order?.shippingAddress?.name}
              </h4>
              <div className='text-gray-500 font-light space-y-1 mt-3'>
                Email:{' '}
                <a
                  className='hover:underline text-'
                  href={`mailto:${order?.shippingAddress?.email}`}
                >
                  {order?.shippingAddress?.email}
                </a>
                <p>Phone: {order?.shippingAddress?.phone}</p>
                <p>
                  Address: {order?.shippingAddress?.address}{' '}
                  {order?.shippingAddress?.city} -{' '}
                  {order?.shippingAddress?.postcode}
                </p>
                <p>Country: {order?.shippingAddress?.country}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Payment Method</h2>
            <div className='border-2 border-gray-200 rounded-md px-8 py-3'>
              <div className='flex items-center space-x-5'>
                <h2 className='text-lg text-gray-700 capitalize'>
                  {order?.paymentMethod} Payment
                </h2>
              </div>
            </div>
          </div>
          <div>
            <div className='flex items-center space-x-5'>
              <h2 className='text-2xl text-gray-600'>Order Status</h2>
              <div>
                {order?.isPaid ? (
                  <Alert success title='Paid' />
                ) : (
                  <Alert title='Not Paid' />
                )}
              </div>
              <div>
                {order?.isDelivered ? (
                  <Alert success title={`Delivered`} />
                ) : (
                  <Alert title='Not Delivered' />
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-2xl text-gray-600 mb-5'>Ordered Items</h2>
            <div className='border-2 border-gray-200 rounded-md px-8 py-3 divide-y-2 space-y-2'>
              {order?.orderItems.map(item => (
                <div
                  className='flex md:items-center flex-col md:flex-row justify-between'
                  key={item?.product}
                >
                  <div className='flex items-center'>
                    <img src={item?.image} alt='' className='w-20 mr-8' />
                    <Link
                      to={`/product/${item?.product}`}
                      className='text-base md:text-lg text-gray-600 hover:underline'
                    >
                      {item?.name}
                    </Link>
                  </div>
                  <p className='prose'>
                    {item?.quantity} x ${item?.price} = $
                    {Number(item?.quantity * item?.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='lg:col-span-1'>
          <div className='border-2 border-dashed p-8 rounded-md'>
            <h2 className='text-xl text-gray-700 font-semibold mb-5'>
              Order Summary
            </h2>
            <div className='space-y-5'>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>
                  Sub-total (
                  {order?.orderItems?.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}
                  ) Items
                </h4>
                <span className='text-base text-gray-600'>
                  ${order?.itemsPrice}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Shipping Price</h4>
                <span className='text-base text-gray-600'>
                  ${order?.shippingPrice}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-md text-gray-600'>Tax</h4>
                <span className='text-base text-gray-600'>
                  ${order?.taxPrice}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <h4 className='text-lg font-semibold text-gray-700'>Total</h4>
                <span className='text-base text-gray-600'>
                  ${order?.totalPrice}
                </span>
              </div>
            </div>
            {!order?.isPaid && order?.user === user._id && (
              <div className='mt-5 border-t-2 border-dashed pt-5'>
                <StripeCheckout
                  label='Pay now'
                  name='Proshop'
                  // billingAddress
                  // shoppingAddress
                  image='https://stripe.com/img/documentation/checkout/marketplace.png'
                  description={`Total price is  $${order?.totalPrice}`}
                  amount={order?.totalPrice * 100}
                  panelLabel='Pay'
                  email={order?.shippingAddress?.email}
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
