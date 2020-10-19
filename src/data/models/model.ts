import { TypedKnex } from '@wwwouter/typed-knex';
import { knexConfig } from '../../../knexfile';

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