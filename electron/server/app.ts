import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import signale from 'signale';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// 创建 typeorm 连接
const isDev = process.env.NODE_ENV === 'development';
const database = path.resolve(__dirname, isDev ? './mock_data.db' : '../mock_data.db');
signale.debug(isDev);
signale.debug(process.cwd());

const prisma = new PrismaClient();

export const userServer = async () => {
  try {
    // 创建并设置express app
    const app = express();
    app.use(bodyParser.json());

    app.get('/users', async function (req: Request, res: Response) {
      const allUsers = await prisma.mock.findMany();
      console.log(allUsers);
      res.send('hello world');
    });

    // 启动 express server
    const server = app.listen(8000);
    server.close();
    signale.success('开启倒计时');
    setTimeout(() => {
      app.listen(8000);
      signale.success('运行成功');
    }, 9000);
  } catch (e) {
    signale.error(e);
  }
};
