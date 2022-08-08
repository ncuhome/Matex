import * as winston from 'winston';
import signale from 'signale';
import { resourcesPath } from './path';
import path from 'path';
import dayjs from "dayjs";

const errorLogPath = path.resolve(resourcesPath, './logs/error.log');
const normalLogPath = path.resolve(resourcesPath, './logs/normal.log');

signale.config({
  displayFilename: true,
  displayTimestamp: true,
  displayDate: false
});
const { combine, timestamp, prettyPrint } = winston.format;
const isDev = process.env.NODE_ENV === 'development';

const winstonLog = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY年 MM月 DD号 HH:mm:ss' }), prettyPrint()),
  transports: [
    new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    new winston.transports.File({ filename: normalLogPath, level: 'info' })
  ]
});

export class MatexLog {
  static log(message: string) {
    if (isDev) {
      signale.log(message);
    } else {
      winstonLog.log({ level: 'info', message });
    }
  }

  static info(message: string) {
    if (isDev) {
      signale.info(message);
    } else {
      winstonLog.log({ level: 'info', message });
    }
  }

  static time(){
    if (isDev) {
      signale.info(dayjs().format('YYYY-MM-DD-HH:mm:ss:SS'));
    } else {
      winstonLog.log({ level: 'info', message:dayjs().format('YYYY-MM-DD-HH:mm:ss:SS')+'' });
    }
  }

  static success(message: string) {
    if (isDev) {
      signale.success(message);
    } else {
      winstonLog.log({ level: 'info', message });
    }
  }

  static error(message: string | any) {
    if (isDev) {
      signale.error(message);
    } else {
      winstonLog.error(message);
    }
  }

  static debug(message: string) {
    if (isDev) {
      signale.debug(message);
    } else {
      winstonLog.log({ level: 'info', message });
    }
  }

  static start(message: string) {
    if (isDev) {
      signale.start(message);
    } else {
      winstonLog.log({ level: 'info', message });
    }
  }
}
