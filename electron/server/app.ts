import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entity/User.entity';
import signale from 'signale';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import path from 'path';

// 创建 typeorm 连接
const isDev = process.env.NODE_ENV === 'development';
const database = path.resolve(__dirname, isDev ? './mock_data.db' : '../mock_data.db');
signale.debug(isDev);
signale.debug(process.cwd());
const config: BetterSqlite3ConnectionOptions = {
  type: 'better-sqlite3',
  database: database,
  entities: [User],
  logging: true
};
createConnection(config).then((connection) => {
  const userRepository = connection.getRepository(User);
  // 创建并设置express app
  const app = express();
  app.use(bodyParser.json());

  app.get('/users', async function (req: Request, res: Response) {
    const user = await userRepository.find();
    console.log(user);
    res.send('hello world');
  });

  // 启动 express server
  app.listen(8000);
  signale.success('运行成功');
});
