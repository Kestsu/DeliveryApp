import React from 'react';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';

function CustomerCheckout() {
  return (
    <div>
      <Header />
      <p>Finalizar Pedido</p>
      <TableProducts />
    </div>
  );
}

export default CustomerCheckout;
