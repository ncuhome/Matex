import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Auth/login';
import Home from '../pages/Home';
import WaitWorkPage from '../components/Work';
import Collection from '../pages/ApiTest';
import BodyTable from '../pages/ApiTest/Header/ConfigTabel/Body';
import ParamsTable from '../pages/ApiTest/Header/ConfigTabel/Params';
import HeadersTable from '../pages/ApiTest/Header/ConfigTabel/Header';
import WebSocketPage from '/@/pages/WebSocket';

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
          <Route path={'apiTest'} element={<Collection />}>
            <Route path={'params'} element={<ParamsTable />} />
            <Route path={'body'} element={<BodyTable />} />
            <Route path={'headers'} element={<HeadersTable />} />
          </Route>
          <Route path={'websocket'} element={<WebSocketPage />} />
          <Route path={'benchmark'} element={<WaitWorkPage />} />
          <Route path={'ok'} element={<WaitWorkPage />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </>
  );
};
