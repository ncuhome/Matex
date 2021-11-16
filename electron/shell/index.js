#!/usr/bin/env node
const fastify = require('fastify')({
  logger: true
});
// 加载框架并新建实例
try {
  // 声明路由
  fastify.get('/fast', function (request, reply) {
    reply.send({ hello: 'world' });
  });

  // 启动服务！
  fastify.listen(6000, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    process.send('我是子进程');
    fastify.log.info(`server listening on ${address}`);
  });
} catch (e) {
  console.log(e);
}
