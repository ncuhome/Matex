import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import Home from '../pages/Home';
import MockView from '../pages/Mock';
import WaitWorkPage from '../components/Work';
import Collection from '../pages/Collection';

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
        <Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} replace />}>
          <Route path={'mock'} element={<MockView />} />
          <Route path={'collect'} element={<Collection />} />
          <Route path={'push'} element={<WaitWorkPage />} />
          <Route path={'ok'} element={<WaitWorkPage />} />
        </Route>
      </Routes>
    </>
  );
};
