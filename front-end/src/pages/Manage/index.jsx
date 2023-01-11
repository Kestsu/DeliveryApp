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
        <UserForm usersList={ usersList } setUsersList={ setUsersList } />
        <UsersTable usersList={ usersList } setUsersList={ setUsersList } />
      </div>
      <style jsx>
        {`
         .page-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
         }
        `}

      </style>
    </>
  );
}

export default Manage;
