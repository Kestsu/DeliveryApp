import React from 'react';
import RegisterComponent from '../components/RegisterComponent';
import MessageErrorFooter from '../components/MessageErrorFooter';

function Register() {
  return (
    <div>
      <RegisterComponent />
      <MessageErrorFooter />
    </div>
  );
}

export default Register;
