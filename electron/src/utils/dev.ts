import net from 'net';

export const listenPip = () => {
  const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\matexPip' : '/tmp/unix.sock';
  const client = net.connect(pipeFile);
  client.on('connect', () => {
    console.log('❤️ 已和开发服务器建立连接');
  });

  client.on('end', () => {
    console.log('主进程代码变更,即将退出并重启');
    client.end();
    process.exit(0);
  });
  client.on('error', (err) => console.error(err.message));
};
