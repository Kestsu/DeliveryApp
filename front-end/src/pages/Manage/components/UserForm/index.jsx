import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../helpers/api';

function UserForm({ usersList, setUsersList }) {
  const [inputValues, setInputValues] = useState(
    { name: '', email: '', password: '', role: 'vendedor' },
  );
  const [isValid, setIsValid] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const createNewUser = async () => {
    try {
      const { data } = await api.post('/users', inputValues);
      setIsValid(true);
      const newUsersList = [...usersList, data];
      setUsersList(newUsersList);
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const six = 6;
    const twenteen = 12;

    if (inputValues.password.length >= six
      && inputValues.email.match(valid)
      && inputValues.name.length > twenteen) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValues]);

  return (
    <div>
      <h3>Cadastrar novo usuário</h3>

      {
        !isValid && (
          <p
            data-testid="admin_manage__element-invalid-register"
          >
            Campos inválidos
          </p>
        )
      }

      <div className="form">
        <div>
          Nome:
          <input
            type="text"
            id="name"
            data-testid="admin_manage__input-name"
            value={ inputValues.name }
            onChange={ ({ target }) => setInputValues(
              { ...inputValues, name: target.value },
            ) }
          />
        </div>

        <div>
          Email:
          <input
            type="text"
            id="email"
            data-testid="admin_manage__input-email"
            value={ inputValues.email }
            onChange={ ({ target }) => setInputValues(
              { ...inputValues, email: target.value },
            ) }
          />
        </div>

        <div>
          Senha:
          <input
            type="password"
            id="password"
            data-testid="admin_manage__input-password"
            value={ inputValues.password }
            onChange={ ({ target }) => setInputValues(
              { ...inputValues, password: target.value },
            ) }
          />
        </div>

        <div>
          Cargo:
          <select
            id="role"
            data-testid="admin_manage__select-role"
            value={ inputValues.role }
            onChange={ ({ target }) => setInputValues(
              { ...inputValues, role: target.value },
            ) }
          >
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
            <option value="customer">Cliente</option>
          </select>
        </div>

        <button
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ () => createNewUser() }
          disabled={ isDisabled }
          className="submit-btn"
        >
          Cadastrar
        </button>
      </div>
      <style jsx>
        {`
          h3 {
            margin-bottom: 0.5rem;
          }

          .form {
            display: flex;
            gap: 0.5rem;
            justify-content: space-between;
          }

          .form > div {
            display: grid;
            gap: 0.25rem;
            grid-template-columns: 2fr 8fr;
            align-items: center;
          }

          input, select {
            padding: 0.25rem;
          }

          .submit-btn {
            border: none;
            width: 100%;
            padding: 0.5rem;
            border-radius: 0.25rem;
            background-color: var(--primary-color);
            color: white;
            font-weight: bold;
          }

          .submit-btn:disabled {
            opacity: 40%;
          }

          @media (max-width: 720px) {
            .form {
              flex-direction: column;
            }
          }

          @media (max-width: 540px) {
          }
        `}

      </style>
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
