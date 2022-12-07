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

      if (name.length <= twenteen) {
        setError('Digite um nome com mais de 12 caracteres');
      }
      if (email.match(isValid) === null) {
        setError('Digite um email válido');
      }
      if (password.length <= six) {
        setError('Digite uma senha com mais de 6 digitos');
      }

      if (password.length > six
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

  const handleNewUser = async () => {
    await handleRegister({ userData: { name, email, password } });
    setError('Email já existente');
  };

  return (
    <div>
      <div>
        <p>Cadastro</p>
      </div>
      <div className="register-container">
        <label className="label-name" htmlFor="name">
          Nome
          <br />
          <input
            id="name"
            data-testid="common_register__input-name"
            type="name"
            placeholder="Seu nome"
            value={ name }
            className="input-name"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <br />
        <label className="label-email" htmlFor="email">
          Email
          <br />
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
          <br />
          Senha
          <br />
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
        <br />
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ disabled }
          onClick={ handleNewUser }
        >
          CADASTRAR
        </button>
      </div>
      <div>
        <LoginErrorHandler message={ error } />
      </div>
    </div>
  );
}

export default RegisterForm;
