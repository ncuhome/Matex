import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import OrbitLoading from '../components/Loading/OrbitLoading';
import Home from '/@/pages/Home';
import Login from '/@/pages/Login';

const ApiTest = React.lazy(() => import('/@/pages/ApiTest'));
const SocketTest = React.lazy(() => import('/@/pages/Socket'));
const Wait = React.lazy(() => import('/@/components/Wait'));

const AuthRouter = () => {
  const auth = !!localStorage.getItem('login');
  const location = useLocation();

  useEffect(() => {
    console.log('pathname: ' + location.pathname);
  }, [location.pathname]);

  return (
    <Suspense fallback={<OrbitLoading />}>
      <Routes>
        <Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} />}>
          <Route path="api" element={<ApiTest />} />
          <Route path="socket" element={<SocketTest />} />
          <Route path="1" element={<Wait />} />
          <Route path="2" element={<Wait />} />
        </Route>
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRouter;
