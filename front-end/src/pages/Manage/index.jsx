import React, { useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../helpers/api';
import UserForm from './components/UserForm';
import UsersTable from './components/UsersTable';

function Manage() {
  const [usersList, setUsersList] = React.useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsersList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="userform-container">
          <UserForm usersList={ usersList } setUsersList={ setUsersList } />
        </div>
        <div className="users-table-container">
          <UsersTable usersList={ usersList } setUsersList={ setUsersList } />
        </div>
      </div>
      <style jsx>
        {`       
          .page-container {
            display: flex;
            flex-direction: column;
            background-color: #f0f0d8;
            gap: 1rem;
         }
          .userform-container {
            background-color: #d8d8c0;
            padding: 1% 2%;
            border-radius: 10px
          }

          .users-table-container {
            background-color: #d8d8c0;
            padding: 1% 2%;
            border-radius: 10px
          }
        `}

      </style>
    </>
  );
}

export default Manage;
