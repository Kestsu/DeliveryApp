import React from 'react';
import LoginForm from '../../components/LoginForm';
import LoginErrorHandler from '../../components/LoginErrorHandler';

function Login() {
  return (
    <div>
      <LoginForm />
      <LoginErrorHandler />
    </div>
  );
}

export default Login;
