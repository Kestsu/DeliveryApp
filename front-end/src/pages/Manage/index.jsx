import React from 'react';
import Header from '../../components/Header';
import UserForm from './components/UserForm';
import UsersTable from './components/UsersTable';

function Manage() {
  const [usersList, setUsersList] = React.useState([]);

  return (
    <>
      <Header />
      <UserForm usersList={ usersList } setUsersList={ setUsersList } />
      <UsersTable usersList={ usersList } setUsersList={ setUsersList } />
    </>
  );
}

export default Manage;
