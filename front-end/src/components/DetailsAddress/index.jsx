import React, { useState, useEffect } from 'react';
import api from '../../helpers/api';

function DetailsAddress() {
  const [seller, setSeller] = useState('');
  const [users, setUsers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');
      setUsers(data);
    })();
  }, []);

  useEffect(() => {
    if (address !== '' && number !== '') { setDisabled(false); } else {
      setDisabled(true);
    }
  }, [seller, address, number]);

  const payment = () => {
    console.log(seller, address, number);
  };

  return (
    <div>
      <p>Detalhes e Endereço para Entrega</p>
      <div>
        <label htmlFor="seller">
          P. Vendedora Responsavel
          <select
            name="seller"
            id="seller"
            value={ seller }
            data-testid="customer_checkout__select-seller"
            onChange={ () => {
              setSeller(seller);
            } }
          >
            {users.map((item) => (
              <option key={ item.id } value={ item.name }>
                {item.name}
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
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default DetailsAddress;
