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
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `${JSON.parse(token)}`;
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

    const token = JSON.parse(localStorage.getItem('token'));
    const name = JSON.parse(localStorage.getItem('name'));
    const role = JSON.parse(localStorage.getItem('role'));
    const email = JSON.parse(localStorage.getItem('email'));

    (async () => {
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
    setLoading(true);

    try {
      const { data } = await api.post('/login', userData);

      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });

      api.defaults.headers.Authorization = `${data.token}`;
      setUser(data);
      setIsAuth(true);

      if (data.role === 'customer') {
        history.push('/customer/products');
      } else if (data.role === 'seller') {
        history.push('/seller/order');
      } else if (data.role === 'administrator') {
        history.push('/admin/manage');
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      // descomentar quando tiver o endpoint de blacklist token
      // await api.delete('/auth/logout');
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
    setLoading(true);

    try {
      const { data } = await api.post('/register', userData);

      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });

      api.defaults.headers.Authorization = `${data.token}`;
      setUser(data.user);
      setIsAuth(true);
      history.push('/customer/products');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { isAuth, loading, user, handleLogin, handleLogout, handleRegister };
};

export default useAuth;
