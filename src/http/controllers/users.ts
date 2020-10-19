import { NextFunction, Request, Response } from 'express';
import { TestModel, Test } from '../../data/models/test';




export class UsersController {
  static async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log('----------------');

      const teste: Test[] = await new TestModel().getAll();

      console.log(teste);

      res.send({ teste });
    } catch (err) {

      console.log(err);

      next(err);
    }
  }
}


