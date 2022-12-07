import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function ProductCard({ id, name,
  price, urlImage, quantity, listProducts, setListProducts,
  totalQty, setTotalQty, index, sumTotal, setTotalPrice,
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
    const removedProduct = { id, name, price, urlImage, quantity: quantity - 1 };

    listProducts[index] = removedProduct;

    setListProducts(listProducts);
    updateLocalStorage(listProducts);
    setTotalQty(totalQty - 1);
    sumTotal(listProducts, setTotalPrice);
  };

  const inputQuantity = (value) => {
    const updatedProduct = { id, name, price, urlImage, quantity: Number(value) };

    listProducts[index] = updatedProduct;

    setListProducts(listProducts);
    updateLocalStorage(listProducts);
    setTotalQty(totalQty - quantity + Number(value));
    sumTotal(listProducts, setTotalPrice);
  };

  return (
    <div className="product-card">
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <img
        className="product-card-img"
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name }
      </p>
      <div className="quantities">
        <button
          data-testid={
            `customer_products__button-card-rm-item-${id}`
          }
          type="button"
          onClick={ () => removeProduct() }
          disabled={ quantity === 0 }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ Number(quantity) }
          onChange={ ({ target }) => inputQuantity(target.value) }
          className="add-rem-buttons label-quantity"
          size={ 1 }
        />
        <button
          data-testid={
            `customer_products__button-card-add-item-${id}`
          }
          type="button"
          onClick={ () => addProduct() }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  listProducts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    quantity: PropTypes.number,
  })).isRequired,
  setListProducts: PropTypes.func.isRequired,
  totalQty: PropTypes.number.isRequired,
  setTotalQty: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  sumTotal: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

export default ProductCard;
