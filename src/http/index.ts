import Joi from 'joi';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import knex from 'knex';
import { HttpResponse } from './types.d';
// import {} from '../routes/customer';
import { NotFoundError, ValidationError } from './error-handler';
import { ErrorHandlerMiddleware } from './middlewares/error-handler';
import { UserRoutes } from './routes/user';

export const testeSchema = Joi.object({
  body: {
    name: Joi.string().required(),
    username: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
  },
});

export const validatorMiddleware = (schema: Joi.Schema) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const validation = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    return next(new ValidationError(validation.error.details));
  }

  Object.assign(req, validation.value);

  return next();
};

export class HttpServer {
  protected app?: express.Application;

  public db?: knex;

  start(): void {
    if (this.app) {
      return;
    }

    // Load .env
    dotenv.config();

    // Express on :)
    const app = express();

    // Express tools <o/
    app.use(helmet()); // some header protection
    app.use(
      bodyParser.json({
        limit: process.env.HTTP_BODY_LIMIT,
      })
    );

    // Routes
    app.use('/user', UserRoutes);

    // Not Found
    app.use(
      '*',
      (
        req: express.Request,
        res: express.Response<HttpResponse>,
        next: express.NextFunction
      ) => {
        next(new NotFoundError());
      }
    );

    app.use(ErrorHandlerMiddleware);
    app.listen(process.env.HTTP_PORT);

    this.app = app;
  }
}
