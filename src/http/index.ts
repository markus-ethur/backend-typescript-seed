import Joi from 'joi';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { HttpResponse } from './types.d';
// import {} from '../routes/customer';
import { NotFoundError } from './error-handler';
import { errorHandlerMiddleware } from '../middlewares/error-handler';

require('dotenv').config();

export class HttpServer {
  protected app?: express.Application;

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
