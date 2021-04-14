import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components';
import Container from './components/Container';
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderPlacedScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductScreen,
  RegisterScreen,
  ShippingScreen,
  UserActivationScreen,
  OrderScreen,
  ProfileScreen,
  UserInfoScreen,
  ChangePasswordScreen,
  UserOrderListScreen,
  UserAddressScreen,
  UserListScreen,
  UserEditScreen,
  ProductListScreen,
} from './screens';

function App() {
  return (
    <Router>
      <Header />
      <Toaster
        position='top-left'
        reverseOrder={false}
        // toastOptions={{ style: { marginTop: '4.5rem' } }}
      />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='product/:id' element={<ProductScreen />} />
            <Route path='cart' element={<CartScreen />}>
              <Route path='/:id' element={<CartScreen />} />
            </Route>
            <Route path='shipping' element={<ShippingScreen />} />
            <Route path='payment' element={<PaymentScreen />} />
            <Route path='placeorder' element={<PlaceOrderScreen />} />
            <Route path='order' element={<OrderScreen />} />
            <Route path='order/:id' element={<OrderScreen />} />
            <Route path='order/:id/success' element={<OrderPlacedScreen />} />
            <Route path='register' element={<RegisterScreen />} />
            <Route
              path='user/active/:token'
              element={<UserActivationScreen />}
            />
            <Route path='login' element={<LoginScreen />} />
            <Route path='profile' element={<ProfileScreen />}>
              <Route path='/' element={<UserInfoScreen />} />
              <Route path='/address' element={<UserAddressScreen />} />
              <Route path='/users' element={<UserListScreen />} />
              <Route path='/users/:id' element={<UserEditScreen />} />
              <Route path='/products' element={<ProductListScreen />} />
              <Route path='/orderlist' element={<UserOrderListScreen />} />
              <Route
                path='/change-password'
                element={<ChangePasswordScreen />}
              />
            </Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
