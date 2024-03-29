import React, { useContext } from 'react';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import './styles.css';
import logo from '../../images/logo.png';

function Header() {
  const { handleLogout, user } = useContext(AuthContext);

  return (
    <header>
      <img src={ logo } alt="logo" width="40px" height="40px" />
      <nav>
        {
          user?.role !== 'administrator' && (
            <Link
              to={ user?.role === 'customer'
                ? '/customer/products' : '/seller/orders' }
              data-testid="customer_products__element-navbar-link-products"
              className="options"
            >
              Produtos
            </Link>

          )
        }
        {
          user?.role === 'customer' && (
            <Link
              to="/customer/orders"
              className="options"
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
              className="options"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Gerenciar Usuários
            </Link>

          )
        }
      </nav>

      <div className="user-menu">

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
            border-bottom: 1px solid var(--primary-color);
            position: fixed;
            width: 100vw;
            background-color: #7a8370;
            z-index: 90;
          }
          // link {
          //   background-color: blue;
          //   text-decoration: none;

          // }
          nav {
            display: flex;
            gap: 1rem;
            align-items: center;
            font-size: 1rem;
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
