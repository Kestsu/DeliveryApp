import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import api from '../../../../helpers/api';

function UsersTable({ usersList, setUsersList }) {
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      const newUsersList = usersList.filter((user) => user.id !== id);
      setUsersList(newUsersList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Usuários</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {
            usersList.map((user, index) => (
              <tr key={ user.id }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${index + 1}`
                  }
                >
                  { user.id }
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-name-${index + 1}`
                  }
                >
                  { user.name }
                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-email-${index + 1}`
                  }
                >
                  { user.email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index + 1}` }
                >
                  { user.role }
                </td>
                <td>
                  <button
                    data-testid={
                      `admin_manage__element-user-table-remove-${index + 1}`
                    }
                    onClick={ () => deleteUser(user.id) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;

UsersTable.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  setUsersList: PropTypes.func.isRequired,
};
