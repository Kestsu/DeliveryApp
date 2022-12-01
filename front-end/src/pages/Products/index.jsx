import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

function Products() {
  const history = useHistory();
  const funcao = () => {
    history.push('/customer/checkout');
  };
  return (
    <div>
      <Header />
      Products
      <button type="button" onClick={ funcao }>GO TO CHECKOUT</button>
    </div>
  );
}

export default Products;
