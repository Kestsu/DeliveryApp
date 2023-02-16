import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../helpers/api';

const forbiddenStatus = 403;
const unauthorizedStatus = 401;

const useAuth = () => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  api.interceptors.request.use(
    (config) => {
      const userInfo = localStorage.getItem('user');
      if (userInfo?.token) {
        config.headers.Authorization = `${JSON.parse(userInfo?.token)}`;
        setIsAuth(true);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === unauthorizedStatus
        || error?.response?.status === forbiddenStatus) {
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        setIsAuth(false);
        history.push('/login');
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    setLoading(true);

    const userInfo = JSON.parse(localStorage.getItem('user'));

    const { token, name, role, email } = userInfo || {};

    (
      async () => {
        if (token && name && role && email) {
          try {
          // verificar se o token é válido
          // await api.get('/customer/products');
            api.defaults.headers.Authorization = `${token}`;
            await api.get('/products');
            setUser({ name, role, email });
            setIsAuth(true);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            setUser({});
            setIsAuth(false);
            api.defaults.headers.Authorization = undefined;
            localStorage.clear();
            console.log(err);
          }
        }

        setLoading(false);
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async ({ userData }) => {
    try {
      const { data } = await api.post('/login', userData);
      setLoading(true);

      localStorage.setItem('user', JSON.stringify(data));
      if (!data.message) {
        api.defaults.headers.Authorization = `${data.token}`;
        setUser(data);
        setIsAuth(true);

        if (data.role === 'customer') {
          history.push('/customer/products');
        } else if (data.role === 'seller') {
          history.push('/seller/orders');
        } else if (data.role === 'administrator') {
          history.push('/admin/manage');
        }
      }
      setLoading(false);
      return 'error';
    } catch (err) {
      console.log(err.response.status);
      // setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      setIsAuth(false);
      setUser({});
      localStorage.clear();
      api.defaults.headers.Authorization = undefined;
      setLoading(false);
      history.push('/login');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRegister = async ({ userData }) => {
    try {
      const { data } = await api.post('/register', userData);
      setLoading(true);
      if (!data.message) {
        localStorage.setItem('user', JSON.stringify(data));

        api.defaults.headers.Authorization = `${data.token}`;
        setUser(data.user);
        setIsAuth(true);
        history.push('/customer/products');
      }
      setLoading(false);
      return 'Ja existe';
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (id, setProducts) => {
    setLoading(true);

    try {
      const localGetItems = JSON.parse(localStorage.getItem('products'));
      const newItems = localGetItems.filter((item) => item.id !== id);
      localStorage.setItem('products', JSON.stringify(newItems));
      setProducts(newItems);

      setIsAuth(true);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return {
    isAuth,
    loading,
    user,
    handleLogin,
    handleLogout,
    handleRegister,
    handleRemoveProduct };
};

export default useAuth;
