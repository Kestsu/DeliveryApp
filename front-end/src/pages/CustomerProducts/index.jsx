import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../helpers/api';
import ProductCard from './components/ProductCard';
import './styles.css';

const sumReduce = (total, item) => {
  if (item.quantity) {
    return total + (Number(item.price) * item.quantity);
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
      (
        async () => {
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
        }
      )();
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
      <p>CustomerProducts</p>
      <p>{`Quantidade total: ${totalQty}`}</p>
      <div
        className="products-container"
      >
        {
          !loading && listProducts.map((product, index) => (
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
          ))
        }

      </div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        className="checkout-button"
        disabled={ totalQty === 0 }
        onClick={ clickCheckoutButton }
      >
        Ver Carrinho:   Valor Total R$:
        <span data-testid="customer_products__checkout-bottom-value">
          {console.log('totalPrice', totalPrice)}
          { totalPrice !== 0 ? totalPrice.replace('.', ',') : totalPrice.toFixed(2)}
        </span>
      </button>
    </div>
  );
}

export default CustomerProducts;
