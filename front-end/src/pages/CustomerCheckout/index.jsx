import React, { useEffect, useState } from 'react';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';
import DetailsAddress from '../../components/DetailsAddress';

function CustomerCheckout() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const response = localStorage.getItem('products');
    const data = JSON.parse(response);
    setProducts(data);
  }, []);
  return (
    <div>
      <Header />
      <p>Finalizar Pedido</p>
      <TableProducts list={ products } />
      <DetailsAddress />
    </div>
  );
}

export default CustomerCheckout;
