import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Tabela(props) {
  // const { fun, index, products, TypeURL } = props;
  // const { name, quantity, price } = products;
  const [lista, setLista] = useState([]);
  const { list, type, fun, total } = props;
  // const { name, quantity, price } = list;

  useEffect(() => {
    setLista(list);
    // console.log(type);
  }, [list]);

  const handleSubTotal = (quantity, price) => {
    const mult = (Number(quantity) * Number(price)).toFixed(2);
    return mult.replace('.', ',');
  };

  if (type === 'checkout') {
    return (
      <div>
        <tbody>
          {lista?.map(({ id, name, quantity, price }, index) => (
            <tr key={ index }>

              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {`R$${price.replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`R$${handleSubTotal(quantity, price)}`}
              </td>

              <td>
                <button
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  type="button"
                  onClick={ () => fun(id) }
                >
                  Remover
                </button>
              </td>

            </tr>
          ))}
        </tbody>
        <span>Total: R$</span>
        <div data-testid="customer_checkout__element-order-total-price">
          {`${total.toFixed(2).replace('.', ',')}`}
        </div>
      </div>
    );
  }
  if (type === 'ordersDetails') {
    return (
      <div>
        <tbody>
          {lista?.map(({ name, quantity, price }, index) => (

            <tr key={ index }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$${price.replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$${handleSubTotal(quantity, price)}`}
              </td>
            </tr>
          ))}
        </tbody>
        <span>Total: R$</span>
        <div data-testid="customer_order_details__element-order-total-price">
          {`${total.toFixed(2).replace('.', ',')}`}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <tbody>

          {lista?.map(({ name, quantity, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                {name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$${price.replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$${handleSubTotal(quantity, price)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <span>Total: R$</span>
      <div data-testid="seller_order_details__element-order-total-price">
        {`${total.toFixed(2).replace('.', ',')}`}
      </div>
    </div>
  );
}

Tabela.propTypes = {
  total: PropTypes.number.isRequired,
  fun: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  list: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Tabela;
