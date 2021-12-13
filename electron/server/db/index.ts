import signale from 'signale';
import path from 'path';
import { PortChannel } from '../../message';
import { DataTypes, Sequelize } from 'sequelize';
import { resourcesPath } from '../../utils/path';

const isDev = process.env.NODE_ENV === 'development';
let dbPath: string;
signale.debug('模式: ', isDev);
if (isDev) {
  dbPath = path.resolve(process.cwd(), './electron/server/db/data.db');
} else {
  dbPath = path.resolve(resourcesPath, './data.db');
}
signale.star(dbPath);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: (msg) => signale.debug(msg)
});

const User = sequelize.define(
  'Mock',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'Mock',
    timestamps: false
  }
);

export class DBServer {
  static async init() {
    try {
      await sequelize.authenticate();
      return true;
    } catch (error) {
      signale.error('Unable to connect to the database:', error);
      return false;
    }
  }

  static async create() {
    try {
      const jane = await User.create({ name: 'Jane' });
      return jane.toJSON();
    } catch (e: any) {
      signale.error(e);
      PortChannel.postMessage('test', e.toString());
    }
  }
}
