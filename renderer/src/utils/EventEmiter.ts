import Emittery from 'emittery';

const emitter = new Emittery();

export default class MyEmitter {
  caches: Map<string, any>;

  constructor() {
    this.caches = new Map();
  }

  on(eventName: string, callback: (value: any) => void) {
    const cache = this.caches.get(eventName);
    if (cache) {
      callback(cache);
      this.caches.delete(eventName);
    }
    return emitter.on(eventName, callback);
  }

  emit(eventName: string, value: any) {
    this.caches.set(eventName, value);
    emitter.emit(eventName, value);
  }
}

export const Emitter = new MyEmitter();
