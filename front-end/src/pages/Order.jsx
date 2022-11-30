import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function Order() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <Header />
      {`Order ${id}`}
    </div>
  );
}

export default Order;

// Product.propTypes = {
//   id: PropTypes.string.isRequired,
// };
