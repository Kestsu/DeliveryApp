import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../helpers/api';

function DetailsAddress() {
  const [users, setUsers] = useState([]);
  const [seller, setSeller] = useState({});
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/sellers');
      setUsers(data);
      const firstSeller = data[0];
      setSeller(firstSeller);
    })();
  }, []);

  useEffect(() => {
    if (address !== '' && number !== '') { setDisabled(false); } else {
      setDisabled(true);
    }
  }, [seller, address, number]);

  const payment = async () => {
    const response = localStorage.getItem('products');
    const products = JSON.parse(response);
    try {
      const { data } = await api.post('/sales', {
        sellerId: seller.id,
        deliveryAddress: address,
        deliveryNumber: number,
        products,
      });

      localStorage.removeItem('products');

      history.push(`/customer/orders/${data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="address-container">
      <h2>Detalhes e Endereço para Entrega</h2>
      <div className="address-detail-container">
        <label htmlFor="seller">
          P. Vendedora Responsavel
          <select
            name="seller"
            id="seller"
            value={ seller }
            data-testid="customer_checkout__select-seller"
            defaultValue={ users[0] || '' }
            onChange={ () => {
              setSeller(seller);
            } }
          >
            {users.map((item) => (
              <option key={ item?.id } value={ item }>
                {item?.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            data-testid="customer_checkout__input-address"
            value={ address }
            onChange={ (e) => setAddress(e.target.value) }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            data-testid="customer_checkout__input-address-number"
            value={ number }
            onChange={ (e) => setNumber(e.target.value) }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        disabled={ disabled }
        onClick={ () => payment() }
        className="submit-btn"
      >
        FINALIZAR PEDIDO
      </button>
      <style jsx>
        {`
          .address-container, .address-detail-container {
            display: grid;
            gap: 1rem;
          }

          label {
            display: grid;
            gap: 0.25rem;
          }

          input, select {
            padding: 0.5rem;
          }

          .submit-btn {
            border: none;
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.25rem;
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
          }
          
          .submit-btn:disabled {
            opacity: 60%;
          }
        `}
      </style>
    </div>
  );
}

export default DetailsAddress;
