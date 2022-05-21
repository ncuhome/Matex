import 'dayjs/locale/zh-cn'; // 导入本地化语言
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件

dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn');

export const matexTime = dayjs;

class _Delay {
  time(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const Delay = new _Delay();
