import { NextFunction, Request, Response } from 'express';

const knex = require('../../config/db');

export class UsersController {
  static async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log('----------------');
      
      const teste = await knex.from('user');
      console.log(teste);

      res.send({ OK: true });
    } catch (err) {

      console.log(err);

      next(err);
    }
  }
}
