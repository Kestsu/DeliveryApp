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
        <div className="fundoClaro">
          <h1>Detalhe Do Pedido</h1>
          <h3
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {`PEDIDO ${`${database?.id}`?.padStart(quatro, '0')}`}

          </h3>
          <h3
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {day}

          </h3>
          <h3
            data-testid={ 'seller_order_details__'
            + 'element-order-details-label-delivery-status' }
          >
            {statusAtual}

          </h3>
          <button
            className="fundo"
            type="button"
            disabled={ disabledPreparing }
            data-testid="seller_order_details__button-preparing-check"
            onClick={ () => updateStatus('Preparando') }
          >
            PREPARAR PEDIDO

          </button>
          <button
            className="fundoRosa"
            type="button"
            disabled={ disabledDispatch }
            data-testid="seller_order_details__button-dispatch-check"
            onClick={ () => updateStatus(preparar) }
          >
            SAIU PARA ENTREGA

          </button>
          <div>
            <TableProducts list={ products } />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersSellerDetails;
