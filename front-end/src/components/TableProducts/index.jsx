import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabela from '../Tabela';
import { AuthContext } from '../../context/Auth/AuthContext';

function TableProducts({ list, setProducts }) {
  const [Total, setTotal] = useState(0);
  const [TypeURL, setTypeURL] = useState('');
  const { handleRemoveProduct } = useContext(AuthContext);
  const history = useHistory();

  const handleReflex = (lista) => {
    const initialValue = 0;

    const soma = lista.reduce(
      (accumulator, currentValue) => accumulator
        + Number(currentValue.price) * Number(currentValue.quantity),
      initialValue,
    );

    setTotal(soma);
  };

  useEffect(() => {
    if (history.location.pathname === '/customer/checkout') {
      setTypeURL('checkout');
    }
    if (history.location.pathname.includes('/customer/orders/')) {
      setTypeURL('ordersDetails');
    }
    if (history.location.pathname.includes('/seller/order/')) {
      setTypeURL('seller');
    }

    handleReflex(list);
  }, [list, history.location.pathname]);

  const removeProduct = (id) => {
    handleRemoveProduct(id, setProducts);

    handleReflex();
  };

  return (
    <Tabela
      list={ list }
      fun={ removeProduct }
      type={ TypeURL }
      total={ Total }
    />
  );
}

TableProducts.propTypes = {
  setProducts: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      urlImage: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default TableProducts;
