import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/login';
import Medium from './Medium';

export const RouterAuth = () => {
  const checkAuth = !!localStorage.getItem('login');
  console.log(checkAuth, 'checkAuth');
  return (
    <>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/'} element={<Navigate to={'/login'} replace />} />
        <Route path={'/m'} element={<Medium />} />
      </Routes>
    </>
  );
};
