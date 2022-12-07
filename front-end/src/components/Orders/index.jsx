import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import api from '../../helpers/api';

const quatro = 4;

function Orders() {
  const [orders, setOrders] = useState([]);
  // const [role, setRole] = useState([]);
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const response = async () => {
      const { data } = await api.get('/sales');
      // const { role } = localStorage.getItem('user');
      // const typeUser = JSON.parse({ role });
      // setRole(typeUser);
      setOrders(data);
    };
    response();
  }, []);

  const orderDetails = (id) => {
    if (user.role === 'customer') {
      history.push(`/customer/orders/${id}`);
    }

    if (user.role === 'seller') history.push(`/seller/order/${id}`);
  };

  return user.role === 'customer' ? (
    <div>
      {orders.map((item) => (
        <div key={ item.id }>
          <p
            key={ item.id }
            data-testid={ `customer_orders__element-order-id-${item.id}` }
          >
            {`PEDIDO ${`${item?.id}`?.padStart(quatro, '0')}`}
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
        </div>
      ))}
    </div>
  ) : (
    <div>
      {orders.map((item) => (
        <div key={ item.id }>
          <p
            key={ item.id }
            data-testid={ `seller_orders__element-order-id-${item.id}` }
          >
            {`PEDIDO ${`${item?.id}`?.padStart(quatro, '0')}`}
          </p>

          <button
            key={ item.status }
            type="button"
            onClick={ () => orderDetails(item.id) }
            data-testid={ `seller_orders__element-delivery-status-${item.id}` }
          >
            {item.status}
          </button>

          <p
            key={ item.saleDate }
            data-testid={ `seller_orders__element-order-date-${item.id}` }
          >
            {item.saleDate}
          </p>

          <p
            key={ item.totalPrice }
            data-testid={ `seller_orders__element-card-price-${item.id}` }
          >
            {item.totalPrice}
          </p>

          <p
            key={ item.deliveryAddress }
            data-testid={ `seller_orders__element-card-address-${item.id}` }
          >
            {`Rua ${item.deliveryAddress}, ${item.deliveryNumber}`}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
