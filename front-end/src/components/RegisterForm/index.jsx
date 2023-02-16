import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import LoginErrorHandler from '../LoginErrorHandler';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  const { handleRegister } = useContext(AuthContext);

  useEffect(() => {
    const handleDisabled = () => {
      const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const six = 6;
      const twenteen = 12;

      if (name.length <= twenteen && name.length !== 0) {
        setError('Digite um nome com mais de 12 caracteres');
      }
      if (email.match(isValid) === null && email.length !== 0) {
        setError('Digite um email válido');
      }
      if (password.length < six && password.length !== 0) {
        setError('Digite uma senha com mais de 6 digitos');
      }

      if (password.length >= six
        && email.match(isValid)
        && name.length > twenteen) {
        setError('');
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };
    handleDisabled();
  }, [email, password, name]);

  const handleName = (target) => {
    setName(target);
  };

  const handleNewUser = async () => {
    await handleRegister({ userData: { name, email, password } });
    setError('Email já existente');
  };

  return (
    <div className="container">
      <div className="register-container">
        <h1>Cadastro</h1>
        <label className="label-name" htmlFor="name">
          Nome
          <input
            id="name"
            data-testid="common_register__input-name"
            type="name"
            placeholder="Seu nome"
            value={ name }
            className="input-name"
            onChange={ ({ target }) => handleName(target.value) }
          />
        </label>
        <label className="label-email" htmlFor="email">
          Email
          <input
            id="email"
            data-testid="common_register__input-email"
            type="email"
            placeholder="Digite seu email"
            value={ email }
            className="input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label className="label-login" htmlFor="password">
          Senha
          <input
            id="password"
            data-testid="common_register__input-password"
            type="password"
            value={ password }
            placeholder="Digite sua senha"
            className="input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        {/* { error ? (
          <p
            data-testid="common_register__element-invalid_register"
          >
            Corrija seus dados, Por favor!
          </p>
        ) : null } */}

        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ disabled }
          onClick={ handleNewUser }
          className="register-btn"
        >
          CADASTRAR
        </button>
        <LoginErrorHandler message={ error } />
      </div>
      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20vh;
            background-color: #f0f0d8;
          }


          .register-container {
            width: 40%;
            display: grid;
            gap: 1rem;
            background-color: #d8d8c0;
            border-radius: 32px;
            padding: 3%;
          }

          label {
            display: grid;
            gap: 0.25rem;
          }

          input {
            width: 100%;
            padding: 0.25rem;
          }

          .register-btn, .register-btn {
            border: none;
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.25rem;
          }

          .register-btn {
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
          }
          
          .register-btn:disabled {
            background-color: var(--primary-color);
            opacity: 60%;
          }

          .register-btn {

          }
        `}
      </style>
    </div>
  );
}

export default RegisterForm;
