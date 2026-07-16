import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'sqlite:./data/coffee-brew-log.sqlite';

const options = {
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

if (databaseUrl.startsWith('postgres')) {
  options.dialectOptions = {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { require: true, rejectUnauthorized: false }
        : false,
  };
}

export const sequelize = new Sequelize(databaseUrl, options);
