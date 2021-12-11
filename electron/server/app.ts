import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import signale from 'signale';
import { PrismaClient } from '@prisma/client';
import type { Server } from 'http';

const isDev = process.env.NODE_ENV === 'development';
signale.debug(isDev);
signale.debug(process.cwd());

const prisma = new PrismaClient();

class MockServer {
  port: number = 8000;
  routes: string[] = [];
  app: Express | null = null;
  server: Server | null = null;

  setPort(port: number) {
    this.port = port;
  }
  setRoutes(routes: string[]) {
    this.routes = [...routes];
  }

  initServer(routes: string[]) {
    this.app = express();
    this.app.use(bodyParser.json());
  }

  setApp(app: Express | null) {
    this.app = app;
  }
  setServer(server: Server | null) {
    this.server = server;
  }

  startServer() {
    if (this.server) {
      this.deleteServer();
    } else {
      this.initServer(this.routes);
      for (const route of this.routes) {
        this.app!.get(route, (req: Request, res: Response) => {
          res.send('hello' + route);
        });
      }
      this.setServer(
        this.app!.listen(this.port, () => {
          signale.success('服务器运行成功');
        })
      );
    }
  }

  deleteServer() {
    if (this.server) {
      this.closeServer();
      this.setServer(null);
      if (this.app) {
        this.setApp(null);
      }
      signale.debug('服务器删除成功');
    }
  }

  closeServer() {
    if (this.server) {
      this.server.close();
      signale.error('关闭服务器成功');
    }
  }
}

export const mockserver = new MockServer();
