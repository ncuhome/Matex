import Emittery from 'emittery';

const emitter = new Emittery();

export default class MyEmitter {
  caches: Map<string, any>;
  consume: boolean;

  constructor() {
    this.caches = new Map();
    this.consume = false;
  }

  onCache(eventName: string, callback: (value: any) => void): Emittery.UnsubscribeFn {
    const cache = this.caches.get(eventName);
    console.log();
    if (cache) {
      callback(cache);
      this.caches.delete(eventName);
      this.consume = true;
    }
    return emitter.on(eventName, callback);
  }

  on(eventName: string, callback: (value: any) => void): Emittery.UnsubscribeFn {
    return emitter.on(eventName, callback);
  }

  reCache() {
    this.consume = true;
  }

  offAll(eventName: string): void {
    emitter.clearListeners(eventName);
  }

  emit(eventName: string, value: any) {
    if (!this.consume) {
      this.caches.set(eventName, value);
    }
    emitter.emit(eventName, value);
  }
}

export const Emitter = new MyEmitter();
