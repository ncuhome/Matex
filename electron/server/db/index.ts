import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { resourcesPath } from '../../utils/path';
import { MatexLog } from '../../scripts/log';

const isDev = process.env.NODE_ENV === 'development';
let dbPath: string;

if (isDev) {
  dbPath = path.resolve(process.cwd(), './electron/server/db/data.db');
} else {
  dbPath = path.resolve(resourcesPath, './data.db');
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: (msg) => MatexLog.debug(msg)
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
      MatexLog.error('Unable to connect to the database:' + error);
      return false;
    }
  }

  static async create() {
    try {
      const jane = await User.create({ name: 'Jane' });
      return jane.toJSON();
    } catch (e: any) {
      MatexLog.error(e);
    }
  }
}
