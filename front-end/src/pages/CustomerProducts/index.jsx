import React, { useEffect, useState } from 'react';
import { IoCart } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../helpers/api';
import ProductCard from './components/ProductCard';

const sumReduce = (total, item) => {
  if (item.quantity) {
    return total + Number(item.price) * item.quantity;
  }
  return total;
};

const sumTotal = (data, setTotalPrice) => {
  const total = data.reduce(sumReduce, 0);
  setTotalPrice(total.toFixed(2));
};

function CustomerProducts() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storagedProducts = JSON.parse(localStorage.getItem('products'));

    try {
      (async () => {
        const { data } = await api.get('/products');
        let qty = 0;

        if (storagedProducts?.length > 0) {
          storagedProducts.forEach((productStoraged) => {
            data.forEach((product, index) => {
              if (product.id === productStoraged.id) {
                qty += Number(productStoraged.quantity);
                data[index].quantity = productStoraged.quantity;
              }
            });
          });
        }

        setTotalQty(Number(qty));
        setListProducts(data);
        setLoading(false);
        sumTotal(data, setTotalPrice);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clickCheckoutButton = () => {
    history.push('/customer/checkout');
  };

  return (
    <div className="products-body">
      <Header />
      <div className="products-container">
        {!loading
          && listProducts.map((product, index) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              name={ product.name }
              price={ product.price }
              urlImage={ product.urlImage }
              quantity={ product.quantity ? Number(product.quantity) : 0 }
              listProducts={ listProducts }
              index={ index }
              setListProducts={ setListProducts }
              totalQty={ totalQty }
              setTotalQty={ setTotalQty }
              sumTotal={ sumTotal }
              setTotalPrice={ setTotalPrice }
            />
          ))}
      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        className="checkout-button"
        disabled={ totalQty === 0 }
        onClick={ clickCheckoutButton }
      >
        <span className="cart-icon">
          <IoCart />
        </span>
        {' '}
        Ver Carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice !== 0
            ? totalPrice.replace('.', ',')
            : totalPrice.toFixed(2)}
        </span>
      </button>
      <style jsx>
        {`
          .products-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1em;
            padding: 3rem 1rem;
            background-color: #f0f0d8;
          }

          .products-body {
            padding-bottom: 5em;
            width: 100%;
            background-color: #f0f0d8;
          }

          .checkout-button {
            bottom: 0;
            height: 3em;
            position: fixed;
            width: 100%;
            background-color: var(--primary-color);
            border: none;
            color: white;
            font-weight: bold;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            box-shadow: 0px 0px 50px var(--primary-color);
          }

          .checkout-button:disabled {
            opacity: 0%;
          }

          .cart-icon {
            display: flex;
            font-size: 2rem;
          }

          @media (max-width: 720px) {
            .products-container {
            grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 540px) {
            .products-container {
              grid-template-columns: 1fr
            }
          }
        `}
      </style>
    </div>
  );
}

export default CustomerProducts;
