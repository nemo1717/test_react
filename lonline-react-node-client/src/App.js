import React from 'react';
import './App.css';
import counter from "./components/counter";
import {LoginForm} from './components/Account-Design/loginForm';
import dashboard from "./components/dashboard"
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PublicRoute from './components/Util/publicRoute';
import PrivateRoute from './components/Util/privateRoute';
import { AccountBox } from './components/Account-Design/accountIndex';
import styled from 'styled-components';
import { Home } from './components/Homepage/home';
import ProductList from './components/ProductList/productlist';
import SelectedProduct from './components/ProductList/selectedProduct';
import Cart from './components/Cart/cart';
import login from './components/User-Account/login';
import register from './components/User-Account/register';
import ForgetPassword from './components/User-Account/forgetPassword';
import ChangePassword from './components/User-Account/change-password';
import Checkout from './components/checkout';
import 'bootstrap/dist/css/bootstrap.css';
import Try_next_products from './components/Homepage/try_next_products'
import RealSelected from './components/ProductList/realSelected';
import Selecto from './components/ProductList/selecto';
import form from './components/Contact-Form/form';



const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {

  return (
    <Router>
        <Switch>
          <Route path = "/" exact component = {Home} /> 
          <Route path = "/home" exact  component = {Home} />
          <Route path = "/counter" exact component = {counter} /> 
          <PublicRoute path = "/login"  component = {login} />
          <PublicRoute path = "/forget-password" exact component = {ForgetPassword} />
          <Route path = "/dashboard" exact component = {dashboard} />
          <PublicRoute path = "/change-password/:token" exact component = {ChangePassword} /> 
          <Route path = "/products-list" exact  component = {ProductList} /> 
          <Route path = "/selected-product/:id" exact component = {SelectedProduct} />
          <PrivateRoute path = "/cart" exact component = {Cart} /> 
          <Route path = "/register" exact component = {register} /> 
          <Route path = "/checkout" exact component = {Checkout} />
          <Route path = "/trial" exact component = {Try_next_products} />
          <Route path = "/selected/:id" exact component = {RealSelected} />
          <Route path = "/selecto/:id" exact component = {Selecto} />
          <Route path = "/contact-us" exact component = {form} />
        </Switch>
    </Router>
  );
}

export default App;
