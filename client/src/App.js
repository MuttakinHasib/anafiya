import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceOrderScreen} />
            <Route exact path='/order/:id' component={OrderScreen} />
            <Route
              exact
              path='/order/:id/success'
              component={OrderPlacedScreen}
            />
            <Route exact path='/register' component={RegisterScreen} />
            <Route
              exact
              path='/user/active/:token'
              component={UserActivationScreen}
            />
            <Route exact path='/login' component={LoginScreen} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
