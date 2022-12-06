import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const {
    isAuth,
    loading,
    user,
    handleLogin,
    handleLogout,
    handleRegister,
    handleRemoveProduct,
  } = useAuth();

  const memoizedValues = useMemo(
    () => ({
      isAuth,
      loading,
      user,
      handleLogin,
      handleLogout,
      handleRegister,
      handleRemoveProduct,
    }),
    [
      isAuth,
      loading,
      user,
      handleLogin,
      handleLogout,
      handleRegister,
      handleRemoveProduct,
    ],
  );

  return (
    <AuthContext.Provider value={ memoizedValues }>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
