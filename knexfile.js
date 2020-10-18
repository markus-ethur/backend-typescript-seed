require('dotenv').config();

/**
 * @type {import('knex').Config}
 */
module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    bigNumberStrings: true,
  },
  pool: {
    min: process.env.DB_POOL_MIN && parseInt(process.env.DB_POOL_MIN, 10),
    max: process.env.DB_POOL_MAX && parseInt(process.env.DB_POOL_MAX, 10),
  },
  migrations: {
    tableName: 'migrations',
  },
};
