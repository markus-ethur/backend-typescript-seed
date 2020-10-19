import { TypedKnex } from '@wwwouter/typed-knex';
import knex from 'knex';

require('dotenv').config();

export const knexConfig = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    bigNumberStrings: true,
  },
  migrations: {
    tableName: 'migrations',
  },
});

export abstract class Model<T> {
  protected db: TypedKnex;

  private modelName: new () => T;

  constructor(modelName: new () => T) {
    this.db = new TypedKnex(knexConfig);
    this.modelName = modelName;
  }

  async getAll(): Promise<T[]> {
    return this.db.query(this.modelName).getMany();
  }
}