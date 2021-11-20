import { createClient } from 'redis';
import { MockData } from './data';

const config = {
  url: 'redis://127.0.0.1:6379',
  database: 0
};

export const saveByRedis = async ({ data, port, route, type }: MockData) => {
  const client = createClient(config);

  client.on('error', (err) => console.log('Redis客户端错误', err));

  await client.connect();
  const fullRoute = route.startsWith('/') ? route : `/${route}`;
  await client.set('port', port);
  await client.set('route', '/m');
  await client.set('type', type);
  await client.set('data', data);
};
