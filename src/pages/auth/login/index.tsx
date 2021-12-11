import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem('login', 'true');
    navigate('/', { replace: true });
  };
  return (
    <div>
      <div onClick={login}>登录页面1</div>
    </div>
  );
};

export default Login;
