import Knex from 'knex';
import { TypedKnex } from '@wwwouter/typed-knex';
import { NextFunction, Request, Response } from 'express';
import { TestModel, Test } from '../../data/models/test';

require('dotenv').config();

const knex = Knex({
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

const typedKnex = new TypedKnex(knex);


export class UsersController {
  static async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log('----------------');

      const teste: Test[] = await typedKnex.query(TestModel).getMany();
      
      console.log(teste);

      res.send({ teste });
    } catch (err) {

      console.log(err);

      next(err);
    }
  }
}


