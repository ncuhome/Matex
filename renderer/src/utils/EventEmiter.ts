import Emittery from 'emittery';

const emitter = new Emittery();

export default class MyEmitter {
  caches: Map<string, any>;

  constructor() {
    this.caches = new Map();
  }

  onCache(eventName: string, callback: (value: any) => void): Emittery.UnsubscribeFn {
    const cache = this.caches.get(eventName);
    console.log();
    if (cache) {
      callback(cache);
      this.caches.delete(eventName);
    }
    return emitter.on(eventName, callback);
  }

  on(eventName: string, callback: (value: any) => void): Emittery.UnsubscribeFn {
    return emitter.on(eventName, callback);
  }

  offAll(eventName: string): void {
    emitter.clearListeners(eventName);
  }

  emit(eventName: string, value: any) {
    this.caches.set(eventName, value);
    emitter.emit(eventName, value);
  }
}

export const Emitter = new MyEmitter();
