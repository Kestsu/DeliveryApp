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

    if (user.role === 'seller') history.push(`/seller/orders/${id}`);
  };

  const alterarFormatoData = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <>
      {user.role === 'customer' ? (
        <div className="page-container">
          {orders.map((item) => (
            <div className="item" key={ item.id }>
              <div className="flex-between">
                <p
                  key={ item.id }
                  data-testid={ `customer_orders__element-order-id-${item.id}` }
                >
                  {`PEDIDO ${`${item?.id}`?.padStart(quatro, '0')}`}
                </p>

                <p
                  key={ item.saleDate }
                  data-testid={ `customer_orders__element-order-date-${item.id}` }
                >
                  {alterarFormatoData(item.saleDate)}
                </p>
              </div>

              <div className="flex-between">
                <p
                  key={ item.totalPrice }
                  data-testid={ `customer_orders__element-card-price-${item.id}` }
                >
                  R$
                  {' '}
                  {item?.totalPrice?.replace('.', ',')}
                </p>

                <button
                  key={ item.status }
                  type="button"
                  onClick={ () => orderDetails(item.id) }
                  data-testid={ `customer_orders__element-delivery-status-${item.id}` }
                  className="access-btn"
                >
                  {item.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {orders.map((item) => (
            <div key={ item.id }>
              <card onClick={ () => orderDetails(item.id) }>
                <p
                  key={ item.id }
                  data-testid={ `seller_orders__element-order-id-${item.id}` }
                >
                  {`PEDIDO ${`${item?.id}`?.padStart(quatro, '0')}`}
                </p>

                <p
                  key={ item.status }
                  data-testid={ `seller_orders__element-delivery-status-${item.id}` }
                >
                  {item.status}
                </p>

                <p
                  key={ item.saleDate }
                  data-testid={ `seller_orders__element-order-date-${item.id}` }
                >
                  {alterarFormatoData(item.saleDate)}
                </p>

                <p
                  key={ item.totalPrice }
                  data-testid={ `seller_orders__element-card-price-${item.id}` }
                >
                  R$
                  {' '}
                  {item?.totalPrice?.replace('.', ',')}
                </p>

                <p
                  key={ item.deliveryAddress }
                  data-testid={ `seller_orders__element-card-address-${item.id}` }
                >
                  {`Rua ${item.deliveryAddress}, ${item.deliveryNumber}`}
                </p>
              </card>
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .page-container {
            display: grid;
            gap: 1rem;
          }

          .flex-between {
            display: flex;
            justify-content: space-between;
          }

          .item {
            display: grid;
            gap: 0.5rem;
          }

          .access-btn {
            background-color: var(--primary-color);
            border: none;
            padding: 0.5rem;
            color: white;
            border-radius: 0.5rem;
          }
        `}
      </style>
    </>
  );
}

export default Orders;
