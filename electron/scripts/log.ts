import winston from 'winston';

const { combine, timestamp, prettyPrint } = winston.format;

// export const winstonLog = winston.createLogger({
//   level: 'info',
//   format: combine(timestamp({ format: 'YYYY年 MM月 DD号 HH:mm:ss' }), prettyPrint()),
//   transports: [
//     new winston.transports.File({ filename: './.log/error.log', level: 'error' }),
//     new winston.transports.File({ filename: './.log/normal.log' })
//   ]
// });
