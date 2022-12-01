import React from 'react';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';

function OrdersDetails() {
  const changeStatus = () => {
    console.log('chegou o pedido');
  };
  return (
    <div>
      <Header />
      <div>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          `PEDIDO ID`
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          `P. Vend: Nome do vendedor`
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          `Data do pedido`
        </p>
        <p
          data-testid={ `customer_
          order_details__element-order-details-label-delivery-status` }
        >
          `STATUS`
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => {
            changeStatus();
          } }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <p>Detalhe do Pedido</p>
      <div>
        <TableProducts />
      </div>
    </div>
  );
}

export default OrdersDetails;
