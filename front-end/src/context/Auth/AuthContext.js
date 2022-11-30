import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { isAuth, loading, user, handleLogin, handleLogout, handleRegister } = useAuth();

  const memoizedValues = useMemo(
    () => ({ isAuth, loading, user, handleLogin, handleLogout, handleRegister }),
    [isAuth, loading, user, handleLogin, handleLogout, handleRegister],
  );

  return (
    <AuthContext.Provider
      value={ memoizedValues }
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
