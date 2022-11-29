import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function Product() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <Header />
      {`Product ${id}`}
    </div>
  );
}

export default Product;

// Product.propTypes = {
//   id: PropTypes.string.isRequired,
// };
