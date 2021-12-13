import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import signale from 'signale';
import type { Server } from 'http';
import { DBServer } from './db';

const isDev = process.env.NODE_ENV === 'development';
signale.debug(isDev);
signale.debug(process.cwd());

class MockServer {
  port: number = 8000;
  routes: string[] = ['/test'];
  app: Express | null = null;
  server: Server | null = null;

  setPort(port: number) {
    this.port = port;
  }
  setRoutes(routes: string[]) {
    this.routes = [...routes];
  }

  async initServer(routes: string[]) {
    await DBServer.init();
    this.app = express();
    this.app.use(bodyParser.json());
  }

  setApp(app: Express | null) {
    this.app = app;
  }
  setServer(server: Server | null) {
    this.server = server;
  }

  async startServer() {
    if (this.server) {
      this.deleteServer();
    } else {
      await this.initServer(this.routes);
      for (const route of this.routes) {
        this.app!.get(route, async (req: Request, res: Response) => {
          const res2 = await DBServer.create();
          signale.debug(res2);
          res.send('hello' + res2);
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
