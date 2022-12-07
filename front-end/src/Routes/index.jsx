import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CustomerCheckout from '../pages/CustomerCheckout';
import Manage from '../pages/Manage';
import CustomerProducts from '../pages/CustomerProducts';
import OrdersSeller from '../pages/OrdersSeller';
import OrdersSellerDetails from '../pages/OrdersSellerDetails';
import OrdersCustomer from '../pages/OrdersCustomer';
import OrdersDetails from '../pages/OrdersDetails';

function Routes() {
  const { isAuth, loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (!loading) {
    return (
      <>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />

        {
          isAuth && (
            <>
              <Route exact path="/customer/products" component={ CustomerProducts } />
              <Route exact path="/customer/products/:idVenda" />
              <Route exact path="/customer/checkout" component={ CustomerCheckout } />
              <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
              <Route exact path="/customer/orders" component={ OrdersCustomer } />

              <Route exact path="/seller/orders" component={ OrdersSeller } />
              <Route exact path="/seller/order/:id" component={ OrdersSellerDetails } />

              <Route exact path="/admin/manage" component={ Manage } />
            </>
          )
        }

        {
          !isAuth && pathname !== '/register' && <Redirect to="/login" />
        }
        {/* <Redirect to="/customer/products" /> */}
      </>
    );
  }

  return (
    <div>
      {loading && <p>loading...</p>}
    </div>
  );
}

export default Routes;
