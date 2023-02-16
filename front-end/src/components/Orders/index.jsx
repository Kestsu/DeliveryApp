import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import api from '../../helpers/api';

const quatro = 4;

function Orders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const response = async () => {
      const { data } = await api.get('/sales');
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
    <div className="page-container">
      {user.role === 'customer' ? (
        <>
          {orders.map((item) => (
            <div className="item-customer" key={ item.id }>
              <div className="flex-between-customer">
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

              <div className="flex-between-customer">
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
        </>
      ) : (
        <>
          {orders.map((item) => (
            <div key={ item.id }>
              <card className="item-seller" onClick={ () => orderDetails(item.id) }>
                <div className="flex-between-seller">
                  <p
                    key={ item.id }
                    data-testid={ `seller_orders__element-order-id-${item.id}` }
                  >
                    {`PEDIDO ${`${item?.id}`?.padStart(quatro, '0')}`}
                  </p>

                  <p
                    key={ item.saleDate }
                    data-testid={ `seller_orders__element-order-date-${item.id}` }
                  >
                    {alterarFormatoData(item.saleDate)}
                  </p>
                </div>

                <div className="flex-between-seller">
                  <p
                    key={ item.totalPrice }
                    data-testid={ `seller_orders__element-card-price-${item.id}` }
                  >
                    R$
                    {' '}
                    {item?.totalPrice?.replace('.', ',')}
                  </p>
                  <p
                    key={ item.status }
                    data-testid={ `seller_orders__element-delivery-status-${item.id}` }
                  >
                    {item.status}
                  </p>
                </div>

                <p
                  key={ item.deliveryAddress }
                  data-testid={ `seller_orders__element-card-address-${item.id}` }
                >
                  {`Rua ${item.deliveryAddress}, ${item.deliveryNumber}`}
                </p>
              </card>
            </div>
          ))}
        </>
      )}
      <style jsx>
        {`
          .page-container {
            display: flex;
            gap: 3rem;
            background-color: #f0f0d8;
            flex-basis: 70%;
            flex-wrap: wrap;
            margin: 40px 0;
          }

          .flex-between-customer {
            display: flex;
            justify-content: space-between;
            padding: 1% 1%;
          }
          .flex-between-seller {
            display: flex;
            justify-content: space-between;
            padding: 3% 6%;
          }
          
          .item-customer {
            border-radius: 23px 23px;
            background-color: #d8d8c0;
            padding: 1% 5%;
            display: grid;
            gap: 1rem;

          }

          .item-seller {
            border-radius: 23px 23px;
            background-color: #d8d8c0;
            padding: 9px 10px;
            display: grid;
            gap: 1rem;

          }

          card {
            border: 2px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 0.5rem;
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
    </div>
  );
}

export default Orders;
