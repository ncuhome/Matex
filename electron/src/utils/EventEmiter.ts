import Emittery from 'emittery';

Emittery.isDebugEnabled = true;

export const myEmitter = new Emittery({ debug: { name: 'electronEmitter' } });
