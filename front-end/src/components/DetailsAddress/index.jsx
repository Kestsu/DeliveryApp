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

    const { data } = await api.post('/sales', {
      sellerId: seller.id,
      deliveryAddress: address,
      deliveryNumber: number,
      products,
    });

    history.push(`/customer/orders/${data.saleId}`);
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
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default DetailsAddress;
