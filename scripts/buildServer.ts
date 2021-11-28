import execa from 'execa';

console.log(process.cwd());
console.log(__dirname);
const dirPath = process.cwd();
(async () => {
  execa.commandSync(
    `cross-env NODE_ENV=production parcel build ${dirPath}/electron/server/app.ts --out-dir ${dirPath}/electron/server/dist --target node`
  );
})();
