import React from 'react';
import PropTypes from 'prop-types';

function Tabela(props) {
  const { type, index, item, removeItem } = props;
  const { name, quantity, price } = item;

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
        {price}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${
          index + 1
        }` }
      >
        {(quantity * price).toFixed(2)}
      </td>
      {(type === 'checkout') ? (
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${
              index + 1
            }` }
            type="button"
            onClick={ () => removeItem(index) }
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
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Tabela;

// tester
