import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../http/error-handler';
// import { logger } from '../../logger';

export const errorHandlerMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ErrorHandler) {
    // logger.warn(err);
    const { statusCode, message, code, details } = err;
    res.status(statusCode).send({
      code,
      message,
      details,
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Internal server failure',
  });

  return next();
};
