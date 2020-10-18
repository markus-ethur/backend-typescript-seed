import Joi from 'joi';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { HttpResponse } from './types.d';
// import {} from '../routes/customer';
import { NotFoundError, ValidationError } from './error-handler';
import { errorHandlerMiddleware } from '../middlewares/error-handler';
import { AppController } from '../controllers/controller';
import { UserController } from '../controllers/user';

require('dotenv').config();

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

  protected loadControllers(): AppController[] {
    return [new UserController()];
  }

  start(): void {
    if (this.app) {
      return;
    }

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
    this.loadControllers().forEach(controller => {
      if (!controller.routeConfigs) {
        return;
      }

      controller.routeConfigs.forEach(routeConfig => {
        const fullPath = [controller.path, routeConfig.path].join('');
        const jobs = [
          ...routeConfig.middlewares,
          routeConfig.func.bind(controller),
        ];

        switch (routeConfig.method) {
          case 'get':
            app.get(fullPath, jobs);
            break;
          case 'post':
            app.post(fullPath, jobs);
            break;
          case 'put':
            app.put(fullPath, jobs);
            break;
          case 'patch':
            app.patch(fullPath, jobs);
            break;
          case 'delete':
            app.delete(fullPath, jobs);
            break;
          default:
            break;
        }
      });
    });

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

    app.use(errorHandlerMiddleware);
    app.listen(process.env.HTTP_PORT);

    this.app = app;
  }
}
