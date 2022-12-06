import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import rockGlass from '../../images/rockGlass.svg';
import LoginErrorHandler from '../LoginErrorHandler';

function LoginForm() {
  const [email, setEmail] = useState('zebirita@email.com');
  const [password, setPassword] = useState('$#zebirita#$');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { handleLogin } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const handleDisabled = () => {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const six = 6;

      if (password.length > six && email.match(isValid)) {
        setError('');
        setDisabled(false);
      } else {
        setError('Digite um email e password válido');
        setDisabled(true);
      }
    };
    handleDisabled();
  }, [email, password]);

  const handleRegister = () => {
    history.push('/register');
  };

  const handleSign = async () => {
    await handleLogin({ userData: { email, password } });
    setError('Digite um email e password válido');
  };

  return (
    <div>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <div className="AppName">
        <p>Nome do seu app</p>
      </div>
      <div className="login-container">
        <label className="label-login" htmlFor="email">
          Login
          <br />
          <input
            id="email"
            data-testid="common_login__input-email"
            type="email"
            placeholder="Digite seu email "
            value={ email }
            className="input-login"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="label-login" htmlFor="password">
          <br />
          Senha:
          <br />
          <input
            id="password"
            data-testid="common_login__input-password"
            type="password"
            value={ password }
            placeholder="Digite sua senha"
            className="input-login"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <br />
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
          onClick={ handleSign }
        >
          LOGIN
        </button>
        <br />
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ handleRegister }
        >
          Ainda não tenho conta
        </button>
      </div>
      <LoginErrorHandler message={ error } />
    </div>
  );
}

export default LoginForm;
