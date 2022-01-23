import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import Home from '../pages/Home';
import MockView from '../pages/ApiTest';
import WaitWorkPage from '../components/Work';
import Collection from '../pages/Collection';
import BodyTable from '../pages/Collection/Header/ConfigTabel/Body';
import ParamsTable from '../pages/Collection/Header/ConfigTabel/Params';
import HeadersTable from '../pages/Collection/Header/ConfigTabel/Header';

export const RouterAuth = () => {
  const location = useLocation();
  const auth = !!localStorage.getItem('login');

  // useEffect(() => {
  //   console.log('当前路由=>' + location.pathname);
  // }, [location.pathname]);

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
