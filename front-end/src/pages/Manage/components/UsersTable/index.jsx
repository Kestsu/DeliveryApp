import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { IoTrashBin } from 'react-icons/io5';
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
      <div className="items-container">
        {
          usersList.map((user, index) => (
            <div className="item" key={ user.id }>
              <div className="item-info">
                {/* <div
                    data-testid={
                      `admin_manage__element-user-table-item-number-${index + 1}`
                    }
                  >
                    { user.id }
                  </div> */}
                <div
                  data-testid={
                    `admin_manage__element-user-table-name-${index + 1}`
                  }
                >
                  { user.name }
                </div>
                <div
                  data-testid={
                    `admin_manage__element-user-table-email-${index + 1}`
                  }
                >
                  { user.email }
                </div>
                <div
                  data-testid={ `admin_manage__element-user-table-role-${index + 1}` }
                >
                  { user.role }
                </div>
              </div>
              <button
                data-testid={
                  `admin_manage__element-user-table-remove-${index + 1}`
                }
                onClick={ () => deleteUser(user.id) }
                type="button"
                className="delete-item-btn"
              >
                <IoTrashBin />
              </button>
            </div>
          ))
        }
      </div>
      <style jsx>
        {`
          h3 {
            margin-bottom: 1rem;
          }

          .items-container {
            display: grid;
            gap: 1rem;
          }

          .item {
            display: flex;
            justify-content: space-between;
            border: 2px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 0.5rem;
          }

          .item-info {
            flex-basis: 80%;
            display: grid;
            gap: 0.25rem;
          }

          .delete-item-btn {
            background: none;
            display: flex;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            opacity: 60%;
            align-items: center;
          }
        `}

      </style>
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
