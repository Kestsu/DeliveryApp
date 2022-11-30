import React from 'react';
import PropTypes from 'prop-types';

function Tabela(props) {
  const { type, fun, index, products } = props;
  const { description, quantidade, value, SubTotal } = products;

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
        {description}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${
          index + 1
        }` }
      >
        {quantidade}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${
          index + 1
        }` }
      >
        {value}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${
          index + 1
        }` }
      >
        {SubTotal}
      </td>
      {type ? (
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
      ) : (
        {}
      )}
    </tr>
  );
}

Tabela.propTypes = {
  index: PropTypes.number.isRequired,
  products: PropTypes.string.isRequired,
  fun: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Tabela;

// tester
