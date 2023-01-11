import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
// import rockGlass from '../../images/rockGlass.svg';
import LoginErrorHandler from '../LoginErrorHandler';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('fulana@deliveryapp.com');
  // const [password, setPassword] = useState('fulana@123');
  // const [email, setEmail] = useState('zebirita@email.com');
  // const [password, setPassword] = useState('$#zebirita#$');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { handleLogin } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const handleDisabled = () => {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const six = 6;

      if (password.length >= six && email.match(isValid)) {
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
    <div className="container">
      {/* <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <div className="AppName">
        <p>Nome do seu app</p>
      </div> */}
      <div className="login-container">
        <label className="label-login" htmlFor="email">
          Login:
          <input
            id="email"
            data-testid="common_login__input-email"
            type="email"
            placeholder="Digite seu email"
            value={ email }
            className="input-login"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="label-login" htmlFor="password">
          Senha:
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
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ disabled }
          onClick={ handleSign }
          className="login-btn"
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ handleRegister }
          className="register-btn"
        >
          Ainda não tenho conta
        </button>
      </div>
      <LoginErrorHandler message={ error } />
      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20vh;
          }

          .login-container {
            width: 80%;
            display: grid;
            gap: 1rem;
          }

          .label-login {
            display: grid;
            gap: 0.25rem;
          }

          .input-login {
            width: 100%;
            padding: 0.25rem;
          }

          .login-btn, .register-btn {
            border: none;
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.25rem;
          }

          .login-btn {
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
          }
          
          .login-btn:disabled {
            opacity: 60%;
          }

          .register-btn {

          }
        `}
      </style>
    </div>
  );
}

export default LoginForm;
