import {createServer} from 'vite';
import {resolve} from 'path';
import WaitOn from 'wait-on';
import { startWatchMainAndPreload } from './parcel-dev.js';
import { ColorLog } from './colorLog.js';
import * as DotEnv from 'dotenv';

DotEnv.config({path:resolve(process.cwd(),'./dev.env'),debug:true});

/**
 * @param {string|number} port
 * @returns {import('wait-on').WaitOnOptions}
 */
const getOptions =(port)=> {
  return (
    {
      resources: [`tcp:${port}`],
      delay: 500, // initial delay in ms, default 0
      interval: 100, // poll interval in ms, default 250ms
      simultaneous: 1, // limit to 1 connection per resource at a time
      timeout: 30000, // timeout in ms, default Infinity
      tcpTimeout: 1000, // tcp timeout in ms, default 300ms
      window: 1000
    }
  );
};

/**
 * Start or restart App when source files are changed
 * @param {import('vite').ViteDevServer} viteDevServer
 * @returns {Promise<import('vite').RollupOutput | Array<import('vite').RollupOutput> | import('vite').RollupWatcher>}
 */
const setWatcher = async (viteDevServer) => {
  const protocol = `http${viteDevServer.config.server.https ? 's' : ''}:`;
  const host = viteDevServer.config.server.host || 'localhost';
  const port = viteDevServer.config.server.port;
  const path = '/';
  const url = `${protocol}//${host}:${port}${path}`;
  await startWatchMainAndPreload(url);
};


(async () => {
  try {
    const viteDevServer = await createServer({
      configFile: resolve(process.cwd(), './renderer/vite.config.ts')
    });
    await viteDevServer.listen(parseInt(process.env.VITE_DEV_SERVER_PORT));
    const {port} = viteDevServer.config.server;
    await WaitOn(getOptions(port));
    ColorLog.logo(port);
    await setWatcher(viteDevServer);
  } catch (e) {
    ColorLog.error(e);
    process.exit(1);
  }
})();


