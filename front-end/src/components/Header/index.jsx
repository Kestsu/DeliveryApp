import React, { useContext } from 'react';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import './styles.css';

function Header() {
  const { handleLogout, user } = useContext(AuthContext);

  return (
    <header>
      <nav>
        {
          user?.role !== 'administrator' && (
            <Link
              to={ user?.role === 'customer'
                ? '/customer/products' : '/seller/orders' }
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </Link>

          )
        }
        {
          user?.role === 'customer' && (
            <Link
              to="/customer/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </Link>
          )
        }
        {
          user?.role === 'administrator' && (
            <Link
              to="/admin/manage"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Gerenciar Usuários
            </Link>

          )
        }
      </nav>

      <div className="user-menu">
        {/* <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user?.name}
        </p> */}

        <button
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => handleLogout() }
          type="button"
          className="logout-btn"
        >
          <IoLogOut />
          {' '}
          <span>Sair</span>
        </button>
      </div>
      <style jsx>
        {`
          header {
            padding: 0.5rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 4px solid var(--primary-color);
            position: fixed;
            width: 100vw;
            background-color: white;
          }

          nav {
            display: flex;
            gap: 1rem;
            align-items: center;
            font-size: 1rem;
            color: var(--primary-color);
            font-weight: bold;
          }

          .user-menu {
            display: flex;
            align-items: center;
          }

          .logout-btn {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            font-weight: bold;
            opacity: 80%;
          }

          .logout-btn span {
            font-size: 1rem;
          }
        `}

      </style>
    </header>
  );
}

export default Header;
