import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircle } from 'react-icons/io5';

function Tabela(props) {
  const [lista, setLista] = useState([]);
  const { list, type, fun, total } = props;

  useEffect(() => {
    setLista(list);
  }, [list]);

  const handleSubTotal = (quantity, price) => {
    const mult = (Number(quantity) * Number(price)).toFixed(2);
    return mult.replace('.', ',');
  };

  return (
    <div className="items-container">
      {type === 'checkout' && (
        <>
          {lista?.map(({ id, name, quantity, price }, index) => (
            <div className="item" key={ index }>
              <div className="item-info">
                <div
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {name}
                </div>
                <div className="item-price-info">
                  <div
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {`R$${price.replace('.', ',')}`}
                  </div>
                  <div
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {quantity}
                    x
                  </div>
                  <div
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$${handleSubTotal(quantity, price)}`}
                  </div>
                </div>
              </div>

              <button
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                type="button"
                onClick={ () => fun(id) }
                className="delete-item-btn"
              >
                <IoCloseCircle />
              </button>
            </div>
          ))}
          <div
            className="total-price"
            data-testid="customer_checkout__element-order-total-price"
          >
            Total: R$
            {' '}
            {`${total.toFixed(2).replace('.', ',')}`}
          </div>
        </>
      )}
      {type === 'ordersDetails' && (
        <div className="items-container">
          {lista?.map(({ name, quantity, price }, index) => (
            <div className="item" key={ index }>
              <div
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {name}
              </div>
              <div
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`R$${price.replace('.', ',')}`}
              </div>
              <div
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {quantity}
                x
              </div>
              <div
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`R$${handleSubTotal(quantity, price)}`}
              </div>
            </div>
          ))}
          <div
            className="total-price"
            data-testid="customer_order_details__element-order-total-price"
          >
            Total: R$
            {' '}
            {`${total.toFixed(2).replace('.', ',')}`}
          </div>
        </div>
      )}
      {(type !== 'checkout' && type !== 'ordersDetails') && (
        <div>
          <div className="items-container">
            {lista?.map(({ name, quantity, price }, index) => (
              <div className="item" key={ index }>
                <div
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {name}
                </div>
                <div
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {quantity}
                </div>
                <div
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$${price.replace('.', ',')}`}
                </div>
                <div
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$${handleSubTotal(quantity, price)}`}
                </div>
              </div>
            ))}
          </div>
          <div
            className="total-price"
            data-testid="seller_order_details__element-order-total-price"
          >
            Total: R$
            {' '}
            {`${total.toFixed(2).replace('.', ',')}`}
          </div>
        </div>
      )}
      <style jsx>
        {`
          .items-container {
            display: grid;
            gap: 2rem;
            background-color: #d8d8c0;
            border-radius: 23px;
            padding: 1% 2%
          }

          .item {
            display: flex;
            justify-content: space-between;
          }

          .item-info {
            flex-basis: 80%;
          }

          .item-price-info {
            display: flex;
            gap: 1rem;
          }
          .total-price {
            font-size: 1.25rem;
            margin-top: 0.5rem;
            padding: 1%;
            text-decoration: inherit;
          }

          .delete-item-btn {
            background: none;
            display: flex;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            opacity: 60%;
            align-items: center;
          }
        `}

      </style>
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
