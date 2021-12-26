import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import Home from '../pages/Home';
import MockView from '../pages/Mock';
import WaitWorkPage from '../components/Work';
import Collection from '../pages/Collection';
import BodyTable from '../pages/Collection/Header/ConfigTabel/renderBody';
import ParamsTable from '../pages/Collection/Header/ConfigTabel/renderParams';
import HeadersTable from '../pages/Collection/Header/ConfigTabel/renderHeader';

export const RouterAuth = () => {
  const location = useLocation();
  const auth = !!localStorage.getItem('login');
  console.log('checkAuth--', auth);

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} replace />}>
          <Route path={'collect'} element={<Collection />}>
            <Route path={'params'} element={<ParamsTable />} />
            <Route path={'body'} element={<BodyTable />} />
            <Route path={'headers'} element={<HeadersTable />} />
          </Route>
          <Route path={'mock'} element={<MockView />} />
          <Route path={'benchmark'} element={<WaitWorkPage />} />
          <Route path={'ok'} element={<WaitWorkPage />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </>
  );
};
