import React from 'react';
import LoginErrorHandler from '../../components/LoginErrorHandler';
import RegisterForm from '../../components/RegisterForm';

function Register() {
  return (
    <div>
      <RegisterForm />
      <LoginErrorHandler />

    </div>
  );
}

export default Register;
