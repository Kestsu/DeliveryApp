import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import api from '../../../../helpers/api';

function UserForm({ usersList, setUsersList }) {
  const [inputValues, setInputValues] = useState(
    { name: '', email: '', password: '', role: 'vendedor' },
  );
  const [isValid, setIsValid] = useState(true);

  const createNewUser = async () => {
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const six = 6;
    const twenteen = 12;

    if (inputValues.password.length > six
      && inputValues.email.match(valid)
      && inputValues.name.length > twenteen
    ) {
      try {
        const { data } = await api.post('/users', inputValues);
        setIsValid(true);
        const newUsersList = [...usersList, data];
        setUsersList(newUsersList);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {

  }, [inputValues]);

  return (
    <div>
      <h3>Cadastrar novo usuário</h3>

      {
        !isValid && (
          <p>Campos inválidos</p>
        )
      }

      <div className="form">
        Nome:
        <input
          type="text"
          id="name"
          data-testid="common_register__input-name"
          value={ inputValues.name }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, name: target.value },
          ) }
        />

        E-mail:
        <input
          type="text"
          id="email"
          data-testid="common_register__input-email"
          value={ inputValues.email }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, email: target.value },
          ) }
        />

        Senha:
        <input
          type="password"
          id="password"
          data-testid="common_register__input-password"
          value={ inputValues.password }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, password: target.value },
          ) }
        />

        Role:
        <select
          id="role"
          data-testid="common_register__input-role"
          value={ inputValues.role }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, role: target.value },
          ) }
        >
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
          <option value="customer">Cliente</option>
        </select>

        <button
          type="button"
          data-testid="common_register__button-register"
          onClick={ () => createNewUser() }
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default UserForm;

UserForm.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  setUsersList: PropTypes.func.isRequired,
};
