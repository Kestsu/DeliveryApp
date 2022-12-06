import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';
import api from '../../helpers/api';

function OrdersDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/sales/${id}`);

      setProducts(data.products);
      setLoading(false);
    })();
    console.log(products);
  }, []);
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
      {loading ? (
        <h1>carregando...</h1>
      ) : (
        <div>
          <TableProducts list={ products } />
        </div>
      )}
    </div>
  );
}

export default OrdersDetails;
