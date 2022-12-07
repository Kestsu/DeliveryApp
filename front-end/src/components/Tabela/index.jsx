import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Tabela(props) {
  const { type, fun, index, products } = props;
  const { name, quantity, price } = products;
  const [subTotal, setSubTotal] = useState([]);

  useEffect(() => {
    const mult = (Number(quantity) * Number(price)).toFixed(2);
    setSubTotal(mult.replace('.', ','));
  }, [price, quantity]);

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${
          index + 1
        }` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${
          index + 1
        }` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${
          index + 1
        }` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${
          index + 1
        }` }
      >
        {`R$${price.replace('.', ',')}`}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${
          index + 1
        }` }
      >
        {`R$${subTotal}`}
      </td>
      {(type === 'checkout') ? (
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${
              index + 1
            }` }
            type="button"
            onClick={ () => fun() }
          >
            Remover
          </button>
        </td>
      ) : ''}
    </tr>
  );
}

Tabela.propTypes = {
  index: PropTypes.number.isRequired,
  fun: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  products: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    replace: PropTypes.func,
  }).isRequired,
};

export default Tabela;
