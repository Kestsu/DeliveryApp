import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../helpers/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const response = async () => {
      const { data } = await api.get('/sales');
      const resposta = localStorage.getItem('role');
      const typeUser = JSON.parse(resposta);
      setRole(typeUser);
      setOrders(data);
    };
    response();
  }, []);

  const orderDetails = (id) => {
    if (role === 'customer') { history.push(`/customer/orders/${id}`); }

    if (role === 'seller') history.push(`/seller/order/${id}`);
  };

  return (
    <div>
      {orders.map((item) => (
        <div key={ item.id }>
          <p
            key={ item.id }
            data-testid={ `customer_orders__element-order-id-${item.id}` }
          >
            {`Pedido ${item.id}`}
          </p>

          <button
            key={ item.status }
            type="button"
            onClick={ () => orderDetails(item.id) }
            data-testid={ `customer_orders__element-delivery-status-${item.id}` }
          >
            {item.status}
          </button>

          <p
            key={ item.saleDate }
            data-testid={ `customer_orders__element-order-date-${item.id}` }
          >
            {item.saleDate}
          </p>

          <p
            key={ item.totalPrice }
            data-testid={ `customer_orders__element-card-price-${item.id}` }
          >
            {item.totalPrice}
          </p>
          {
            (role === 'seller')
              ? (
                <p
                  key={ item.deliveryAddress }
                  data-testid={ `seller_orders__element-card-address-${item.id}` }
                >
                  {`Rua ${item.deliveryAddress}, Bairro ... , ${item.deliveryNumber}`}
                </p>
              ) : ''
          }
        </div>
      ))}
    </div>
  );
}

export default Orders;
