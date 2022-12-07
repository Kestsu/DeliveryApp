import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import './styles.css';

function Header() {
  const { handleLogout, user } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          {
            user?.role !== 'administrator' && (
              <li>
                <Link
                  to={ user?.role === 'customer'
                    ? '/customer/products' : '/seller/orders' }
                  data-testid="customer_products__element-navbar-link-products"
                >
                  PRODUTOS
                </Link>

              </li>
            )
          }
          {
            user?.role === 'customer' && (
              <li>
                <Link
                  to="/customer/orders"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  MEUS PEDIDOS
                </Link>
              </li>
            )
          }
          {
            user?.role === 'administrator' && (
              <li>
                <Link
                  to="/admin/manage"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  GERENCIAR USUÁRIOS
                </Link>

              </li>
            )
          }
        </ul>
      </nav>

      <div className="userMenu">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user?.name}
        </p>

        <button
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => handleLogout() }
          type="button"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
