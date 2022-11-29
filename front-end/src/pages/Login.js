import React from 'react';
import LoginComponent from '../components/LoginComponet';
import MessageErrorFooter from '../components/MessageErrorFooter';

function Login() {
  return (
    <div>
      <LoginComponent />
      <MessageErrorFooter />
    </div>
  );
}

export default Login;
