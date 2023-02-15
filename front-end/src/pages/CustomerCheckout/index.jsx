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
      <div className="page-container">
        <h1>Finalizar Pedido</h1>
        <TableProducts list={ products } setProducts={ setProducts } />
        <DetailsAddress list={ products } />
      </div>
      <style jsx>
        {`
          .page-container {
            display: grid;
            gap: 2rem;
            background-color: #f0f0d8;
          }
        `}

      </style>
    </div>
  );
}

export default CustomerCheckout;
