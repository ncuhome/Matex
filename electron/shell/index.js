#!/usr/bin/env node
const shell = require('shelljs');
const { createClient } = require('redis');
const fastify = require('fastify')({
  logger: true
});
const version = shell.exec('node --version', { silent: true }).stdout;
console.log('node 版本' + version);

const getRedisData = async () => {
  const config = {
    url: 'redis://127.0.0.1:6379',
    database: 0
  };

  const client = createClient(config);

  client.on('error', (err) => console.log('Redis客户端错误', err));

  await client.connect();
  const port = await client.get('port');
  const route = await client.get('route');
  const data = await client.get('data');
  console.log(port, route, data);

  fastify.get(route, function (request, reply) {
    reply.send(data);
  });

  fastify.listen(port, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log('拿到数据', { route, port, data });
    fastify.log.info(`server listening on ${address}`);
  });
};

getRedisData();
