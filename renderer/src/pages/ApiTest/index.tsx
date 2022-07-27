import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const ApiTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/api') {
      navigate('/api/single');
    }
  }, [location.pathname]);

  return <Outlet />;
};

export default ApiTest;
