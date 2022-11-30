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
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setIsAuth(true);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error?.response?.status === forbiddenStatus && !originalRequest.retry) {
        originalRequest.retry = true;

        const { data } = await api.post('/auth/refresh_token');
        if (data) {
          localStorage.setItem('token', JSON.stringify(data.token));
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
        }
        return api(originalRequest);
      }
      if (error?.response?.status === unauthorizedStatus) {
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        setIsAuth(false);
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
      if (token) {
        try {
          const { data } = await api.post('/auth/refresh_token');
          api.defaults.headers.Authorization = `Bearer ${data.token}`;
          setUser(data.user);
          setIsAuth(true);
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleLogin = async (userData) => {
    setLoading(true);

    try {
      // const { data } = await api.post('/auth/login', userData);

      // data de teste
      const data = { user: { role: 'administrator' }, token: '123' };

      localStorage.setItem('token', JSON.stringify(data.token));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
      setIsAuth(true);
      history.push('/products');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api.delete('/auth/logout');
      setIsAuth(false);
      setUser({});
      localStorage.removeItem('token');
      api.defaults.headers.Authorization = undefined;
      setLoading(false);
      history.push('/login');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { isAuth, loading, user, handleLogin, handleLogout };
};

export default useAuth;
