import React, { useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';

function Header() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <header>
      <h1>Header</h1>
      <button onClick={ () => handleLogout() } type="button">logout</button>
    </header>
  );
}

export default Header;
