import React from 'react';
import PropTypes from 'prop-types';

function LoginErrorHandler({ message }) {
  return (
    <div>
      <p
        id="error"
        data-testid="common_register__button-register"
      >
        {message}

      </p>
    </div>
  );
}

LoginErrorHandler.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoginErrorHandler;
