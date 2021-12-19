import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<any> = (props: any) => {
  const navigate = useNavigate();
  console.log('login');
  const login = () => {
    localStorage.setItem('login', 'true');
    navigate('/mock', { replace: true });
  };
  return (
    <div>
      <div onClick={login} style={{ marginTop: 40, marginLeft: 40 }}>
        登录页面1
      </div>
    </div>
  );
};

export default Login;
