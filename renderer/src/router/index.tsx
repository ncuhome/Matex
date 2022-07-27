import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/Auth/login';
import Home from '../pages/Home';
import WaitWorkPage from '../components/Work';
import ApiTest from '../pages/ApiTest';
import SingleTest from '../pages/ApiTest/SingleTest';
import BodyTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Body';
import ParamsTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Params';
import HeadersTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Header';
import WebSocketPage from '/@/pages/WebSocket';

export const RouterAuth = () => {
  const location = useLocation();
  const auth = !!localStorage.getItem('login');

  return (
    <>
      <Routes>
        <Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} replace />}>
          <Route path={'api'} element={<ApiTest />}>
            <Route path={'single'} element={<SingleTest />}>
              <Route path={'params'} element={<ParamsTable />} />
              <Route path={'body'} element={<BodyTable />} />
              <Route path={'headers'} element={<HeadersTable />} />
            </Route>
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
