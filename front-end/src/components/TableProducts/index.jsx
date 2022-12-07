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
      // console.log('checkout');
      setTypeURL('checkout');
    }
    if (history.location.pathname.includes('/customer/orders/')) {
      // console.log('ordersDetails');
      setTypeURL('ordersDetails');
    }
    if (history.location.pathname.includes('/seller/order/')) {
      // console.log('seller');
      setTypeURL('seller');
    }

    handleReflex(list);
  }, [list, history.location.pathname]);

  const removeProduct = (id) => {
    handleRemoveProduct(id, setProducts);

    handleReflex();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {TypeURL === 'checkout' ? <th>Remover Item</th> : ''}
          </tr>
        </thead>
        <tbody>
          {/* {
            list?.map((item, index) => (
              <Tabela
                key={ item.id }
                index={ index }
                products={ item }
                fun={ () => removeProduct(item.id) }
                type={ TypeURL }
              />
            ))
          } */}
          <Tabela
            list={ list }
            fun={ removeProduct }
            type={ TypeURL }
            total={ Total }
          />
        </tbody>
      </table>
      {/* {TypeURL === 'checkout' ? (
        <div data-testid="customer_checkout__element-order-total-price">
          {`Total: R$${Total.toFixed(2).replace('.', ',')}`}
        </div>
      ) : (
        <div data-testid="customer_order_details__element-order-total-price">
          {`Total: R$${Total.toFixed(2).replace('.', ',')}`}
        </div>
      )} */}
    </div>
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
