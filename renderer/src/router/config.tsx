import Home from '../pages/Home';
import WaitWorkPage from '../components/Work';
import ApiTest from '../pages/ApiTest/SingleTest';
import BodyTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Body';
import ParamsTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Params';
import HeadersTable from '../pages/ApiTest/SingleTest/Header/ConfigTabel/Header';
import WebSocketPage from '/@/pages/WebSocket';
import React from 'react';
import Login from '/@/pages/Auth/login';

export interface RouteProps {
  path: string;
  element: React.ReactElement;
  children?: RouteProps[];
  title?: string;
  icon?: string;
}

export const routes: RouteProps[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'apiTest',
        element: <ApiTest />,
        children: [
          {
            path: 'single',
            icon: 'anchor',
            element: <BodyTable />
          },
          {
            path: 'auto',
            element: <ParamsTable />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];
