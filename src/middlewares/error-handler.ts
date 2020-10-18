import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, ReponseStatus } from '../http/error-handler';
// import { logger } from '../../logger';

export const errorHandlerMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ErrorHandler) {
    // logger.warn(err);
    const { statusCode, message, code, details, status } = err;
    res.status(statusCode).send({
      code,
      message,
      details,
      status,
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Internal server failure',
    status: ReponseStatus.ERROR,
  });

  return next();
};
