import Emittery from 'emittery';
import type { Got } from 'got';

interface ExtendGlobal extends Global {
  Got: Got;
}
export const Global: ExtendGlobal = global as any;

export const emitter = new Emittery();

