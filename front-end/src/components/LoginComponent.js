import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();
  useEffect(() => {
    const handleDisabled = () => {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const six = 6;

      if (password.length > six && email.match(isValid)) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    handleDisabled();
  }, [email, password]);

  const handleLogin = () => {
    // VERIFICAR SE EH VENDEDOR/ Cliente/ ADMIN
    // const { history } = props;
  };

  const handleSign = () => {
    history.push('/register');
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
          onClick={ handleLogin }
        >
          LOGIN
        </button>
        <br />
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ handleSign }
        >
          Ainda não tenho conta
        </button>
      </div>

    </div>
  );
}

export default LoginComponent;
