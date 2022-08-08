import { build } from 'vite'
import {resolve} from "path";
import {builtinModules} from "module";
import {syncDependencies} from "./syncDependencies.js";

const rootDir	 = process.cwd();


const renderDeps = await build({ configFile: resolve(rootDir,'renderer/vite.config.ts') })
const mainRes = await build({ configFile: resolve(rootDir,'electron/vite.config.ts') })
const preloadRes = await build({ configFile: resolve(rootDir,'preload/vite.config.ts') })
const mainDeps = mainRes[0].output[0].imports.filter((item)=>builtinModules.indexOf(item) < 0)
const preloadDeps = preloadRes.output[0].imports.filter((item)=>builtinModules.indexOf(item) < 0)

// 同步依赖
await syncDependencies(new Set([...mainDeps,...preloadDeps]))


