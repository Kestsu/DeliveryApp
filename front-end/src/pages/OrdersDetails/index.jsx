import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableProducts from '../../components/TableProducts';
import Header from '../../components/Header';
import api from '../../helpers/api';

const quatro = 4;

function OrdersDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [status, setStatusAtual] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [date, setDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/sales/${id}`);
      setOrder(data);
      setStatusAtual(data.status);
      setProducts(data.products);
      const saleDate = new Date(data.saleDate);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      setDate(saleDate.toLocaleDateString('pt-BR', options));
      if (status === 'Em Trânsito') setDisabled(false);
      setLoading(false);
    })();
  }, [id, status]);

  const updateStatus = async () => {
    try {
      const response = await api.patch(`/sales/${id}`, { status: 'Entregue' });
      setDisabled(true);
      setStatusAtual(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page">
      <Header />
      <div className="page-container">
        <h1>Detalhe do Pedido</h1>
        <div className="order-info">
          <div className="flex-between">
            <p data-testid="customer_order_details__element-order-details-label-order-id">
              {`PEDIDO ${`${order?.id}`?.padStart(quatro, '0')}`}
            </p>

            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {date}
            </p>
          </div>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vend: ${order?.seller?.name} `}
          </p>
          <p
            data-testid={ 'customer_order_details__'
           + 'element-order-details-label-delivery-status' }
          >
            {status}
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ disabled }
            onClick={ () => {
              updateStatus();
            } }
            className="delivery-check-btn"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>

        {loading ? (
          <h1>carregando...</h1>
        ) : (
          <div>
            <TableProducts list={ products } />
          </div>
        )}
      </div>

      <style jsx>
        {`
          .page-container {
            display: grid;
            gap: 2rem;
            background-color: #f0f0d8;
          }
          
          .delivery-check-btn {
            border: none;
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.25rem;
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
          }

          .delivery-check-btn:disabled {
            opacity: 40%;
          }

          .flex-between {
            display: flex;
            justify-content: space-between;
          }

          .order-info {
            display: grid;
            gap: 0.5rem;
          }
        `}

      </style>
    </div>
  );
}

export default OrdersDetails;
