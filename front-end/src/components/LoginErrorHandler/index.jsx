import React from 'react';
import PropTypes from 'prop-types';

function LoginErrorHandler({ message }) {
  return (
    <div>
      <p
        className="error"
        id="error"
        data-testid="common_login__element-invalid-email"
      >
        {message}

      </p>
      <style jsx>
        {`
         .error{
          font-size: 12px;
          color:red;
         }
        `}
      </style>
    </div>
  );
}

LoginErrorHandler.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoginErrorHandler;
