import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components';
import Container from './components/Container';
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  PlaceOrderScreen,
  ProductScreen,
  RegisterScreen,
  ShippingScreen,
  UserActivationScreen,
} from './screens';
import PaymentScreen from './screens/PaymentScreen';

function App() {
  return (
    <Router>
      <Header />
      <Toaster
        position='top-right'
        reverseOrder={false}
        // toastOptions={{ style: { marginTop: '4.5rem' } }}
      />
      <main>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart' component={CartScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceOrderScreen} />
            <Route exact path='/order/:id' component={OrderScreen} />
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
