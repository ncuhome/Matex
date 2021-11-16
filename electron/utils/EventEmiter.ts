interface Listener {
  name: string;
  callback: ((data: any) => void)[];
}

class MyEventEmitter {
  listeners: Listener[] = [];

  /**
   * 可以有多个监听者,返回插入的监听对象位置和插入的监听函数位置,用以之后的取消订阅
   * 若要取消监听,回调函数应该是同一个引用
   * @param name 监听命名空间
   * @param callback 回调 可用泛型进一步约束
   */
  on<T extends any>(name: string, callback: (data: T) => void) {
    let exist: boolean = false;
    let itemIndex: number = -1;
    let funcIndex: number = -1;
    this.listeners.forEach((item, index) => {
      if (item.name === name) {
        exist = true;
        itemIndex = index;
      }
    });
    //如果不存在,则创建一个
    if (!exist) {
      itemIndex = this.listeners.push({ name: name, callback: [callback] }) - 1;
      funcIndex = 0;
    } else {
      //否则新增一个监听
      funcIndex = this.listeners[itemIndex].callback.push(callback) - 1;
    }
    return [itemIndex, funcIndex];
  }

  /**
   * 可以有多个监听者,返回插入的监听对象位置和插入的监听函数位置,用以之后的取消订阅
   * 若要取消监听,回调函数应该是同一个引用
   * @param name 监听命名空间
   * @param callback 回调
   */
  once<T extends any>(name: string, callback: (data: T) => void) {
    const only = (data: any) => {
      callback(data);
      this.off(name, only);
    };
    this.on(name, only);
  }

  /**
   * 可以有多个监听者,返回插入的监听对象位置和插入的监听函数位置,用以之后的取消订阅
   * 若要取消监听,回调函数应该是同一个引用
   * @param name 监听命名空间
   * @param data 要传输的数据
   */
  emit<T extends any>(name: string, data: T) {
    this.listeners.forEach((item, index) => {
      if (item.name === name) {
        //向所有监听者发送
        this.listeners[index].callback.forEach((fn) => fn(data));
      }
    });
  }

  off(name: string, callback: (data: any) => void) {
    this.listeners.forEach((item, index) => {
      if (item.name === name) {
        this.listeners[index].callback.forEach((fn, index2) => {
          if (fn === callback) {
            this.listeners[index].callback.splice(index2, 1);
          }
        });
      }
    });
  }

  //移除某个命名空间下的所有监听者
  offAll(name: string) {
    this.listeners.forEach((item, index) => {
      if (item.name === name) {
        this.listeners[index].callback = [];
      }
    });
  }
}
export const myEmitter = new MyEventEmitter();
