import React from 'react';
import PropTypes from 'prop-types';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

function ProductCard({
  id,
  name,
  price,
  urlImage,
  quantity,
  listProducts,
  setListProducts,
  totalQty,
  setTotalQty,
  index,
  sumTotal,
  setTotalPrice,
}) {
  const updateLocalStorage = (newListProducts) => {
    localStorage.setItem(
      'products',
      JSON.stringify(newListProducts.filter((product) => product.quantity > 0)),
    );
  };

  const addProduct = () => {
    const newProduct = { id, name, price, urlImage, quantity: quantity + 1 };

    listProducts[index] = newProduct;

    setListProducts(listProducts);
    updateLocalStorage(listProducts);
    setTotalQty(totalQty + 1);
    sumTotal(listProducts, setTotalPrice);
  };

  const removeProduct = () => {
    const removedProduct = {
      id,
      name,
      price,
      urlImage,
      quantity: quantity - 1,
    };

    listProducts[index] = removedProduct;

    setListProducts(listProducts);
    updateLocalStorage(listProducts);
    setTotalQty(totalQty - 1);
    sumTotal(listProducts, setTotalPrice);
  };

  const inputQuantity = (value) => {
    const updatedProduct = {
      id,
      name,
      price,
      urlImage,
      quantity: Number(value),
    };

    listProducts[index] = updatedProduct;

    setListProducts(listProducts);
    updateLocalStorage(listProducts);
    setTotalQty(totalQty - quantity + Number(value));
    sumTotal(listProducts, setTotalPrice);
  };

  return (
    <div className="product-card">
      <div className="product-border">
        <img
          className="product-card-img"
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <p className="price" data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        {' '}
        {price.replace('.', ',')}
      </p>
      <div className="amount">
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => removeProduct() }
          disabled={ quantity === 0 }
          className="interaction-btn"
        >
          <IoRemoveCircle />
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ Number(quantity) }
          onChange={ ({ target }) => inputQuantity(target.value) }
          className="number-quantity"
          size={ 1 }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => addProduct() }
          className="interaction-btn"
        >
          <IoAddCircle />
        </button>
      </div>
      <style jsx>
        {`
          .product-card {
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            padding: 0.5em;
            gap: 0.5rem;
            background-color: #d8d8c0;
            border-radius: 32px;
          }

          .product-card-img {
            height: 200px;
          }

          .price {
            font-size: 1.4rem;
            font-weight: bold;
            color: var(--primary-color);
          }

          .number-quantity {
            background-color: #d8d8c0;
          }

          .amount {
            display: flex;
            justify-content: space-between;
          }

          .interaction-btn {
            font-size: 3rem;
            background: none;
            border: none;
            display: flex;
            color: var(--primary-color);
            
          }

          .interaction-btn:disabled {
            opacity: 40%;
          }

          input {
            border: none;
            text-align: center;
            font-weight: bold;
            color: var(--primary-color);
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  listProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      urlImage: PropTypes.string.isRequired,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  setListProducts: PropTypes.func.isRequired,
  totalQty: PropTypes.number.isRequired,
  setTotalQty: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  sumTotal: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

export default ProductCard;
