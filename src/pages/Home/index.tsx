import React from 'react';
import { Outlet } from 'react-router-dom';

const Home: React.FC<any> = (props: any) => {
  console.log('home');
  return (
    <>
      <div>home</div>
      <Outlet />
    </>
  );
};

export default Home;
