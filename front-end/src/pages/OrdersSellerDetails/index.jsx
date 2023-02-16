import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import TableProducts from '../../components/TableProducts';
import api from '../../helpers/api';
import '../../index.css';

const quatro = 4;
const preparar = 'Em Trânsito';

function OrdersSellerDetails() {
  const [products, setProducts] = useState([]);
  const [day, setDay] = useState([]);
  const [database, setDatabase] = useState([]);
  const [statusAtual, setStatusAtual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabledPreparing, setDisabledPreparing] = useState(true);
  const [disabledDispatch, setDisabledDispatch] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/sales/${id}`);
        setDatabase(data);
        setProducts(data.products);
        setStatusAtual(data.status);
        const date = new Date(data.saleDate);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        setDay(date.toLocaleDateString('pt-BR', options));
        if (statusAtual === 'Pendente') {
          setDisabledPreparing(false);
          setDisabledDispatch(true);
        }
        if (statusAtual === 'Preparando') {
          setDisabledPreparing(true);
          setDisabledDispatch(false);
        }
        if (statusAtual === preparar) {
          setDisabledPreparing(true);
          setDisabledDispatch(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, statusAtual]);

  const updateStatus = async (newStatus) => {
    try {
      const response = await api.patch(`/sales/${id}`, { status: newStatus });
      setStatusAtual(response.data.status);
      if (statusAtual === 'Preparando') {
        setDisabledPreparing(true);
        setDisabledDispatch(false);
      }
      if (statusAtual === preparar) {
        setDisabledPreparing(true);
        setDisabledDispatch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <h1>carregando...</h1>
      ) : (
        <div className="page-container">
          <h1>Detalhe Do Pedido</h1>
          <div className="flex-between">
            <h3 data-testid="seller_order_details__element-order-details-label-order-id">
              {`PEDIDO ${`${database?.id}`?.padStart(quatro, '0')}`}
            </h3>
            <h3
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              {day}
            </h3>
          </div>
          <h3
            data-testid={
              'seller_order_details__'
              + 'element-order-details-label-delivery-status'
            }
          >
            {statusAtual}
          </h3>
          <button
            type="button"
            disabled={ disabledPreparing }
            data-testid="seller_order_details__button-preparing-check"
            onClick={ () => updateStatus('Preparando') }
            className="delivery-check-btn"
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            disabled={ disabledDispatch }
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ () => updateStatus(preparar) }
            className="delivery-check-btn"
          >
            SAIU PARA ENTREGA
          </button>
          <div>
            <TableProducts list={ products } />
          </div>
        </div>
      )}
      <style jsx>
        {`
          .page-container {
            display: grid;
            gap: 1rem;
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

export default OrdersSellerDetails;
