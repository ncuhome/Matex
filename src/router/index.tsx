import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import Medium from './Medium';
import Home from '../pages/Home';

export const RouterAuth = () => {
  const location = useLocation();
  const auth = !!localStorage.getItem('login');
  console.log(auth, 'checkAuth');

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} replace />} />
        <Route path={'/m'} element={<Medium />} />
      </Routes>
    </>
  );
};
