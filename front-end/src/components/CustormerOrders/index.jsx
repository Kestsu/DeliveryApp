import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../helpers/api';

function CustormerOrders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const response = async () => {
      const { data } = await api.get('/sales');
      setOrders(data);
    };
    console.log('TO AQWUI');
    response();
  }, []);

  const orderDetails = (sellerId) => {
    history.push(`/customer/orders/${sellerId}`);
  };

  return (
    <div>
      {orders.map((item) => (
        <div key={ item.sellerId }>
          <p
            key={ item.id }
            data-testid={ `customer_orders__element-order-id-${item.sellerId}` }
          >
            {`Pedido ${item.id}`}
          </p>

          <button
            key={ item.status }
            type="button"
            onClick={ () => orderDetails(item.sellerId) }
            data-testid={ `customer_orders__element-delivery-status-${item.sellerId}` }
          >
            {item.status}
          </button>

          <p
            key={ item.saleDate }
            data-testid={ `customer_orders__element-order-date-${item.sellerId}` }
          >
            {item.saleDate}
          </p>

          <p
            key={ item.totalPrice }
            data-testid={ `customer_orders__element-card-price-${item.sellerId}` }
          >
            {item.totalPrice.replace('.', ',')}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CustormerOrders;
