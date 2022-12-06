import React from 'react';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';
import DetailsAddress from '../../components/DetailsAddress';

function CustomerCheckout() {
  return (
    <div>

      <Header />
      <p>Finalizar Pedido</p>
      <TableProducts />
      <DetailsAddress />
    </div>
  );
}

export default CustomerCheckout;
