import Joi from 'joi';

export enum ReponseStatus {
  'OK' = 'OK',
  'ERROR' = 'ERROR',
}

export abstract class ErrorHandler extends Error {
  code: string;

  statusCode: number;

  details?: Record<string, any>;

  status: ReponseStatus;

  constructor(
    code: string,
    message: string,
    statusCode: number,
    details?: Record<string, any>,
    status: ReponseStatus = ReponseStatus.ERROR
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.status = status;
  }
}

export class NotFound extends ErrorHandler {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 404, details, ReponseStatus.ERROR);
  }
}

export class BadRequest extends ErrorHandler {
  constructor(code: string, message: string, details?: Record<string, any>) {
    super(code, message, 400, details, ReponseStatus.ERROR);
  }
}

export class NotFoundError extends NotFound {
  constructor() {
    super('NOT_FOUND', 'Route not found');
  }
}

export class ResourceNotFoundError extends NotFound {
  constructor() {
    super('RESOURCE_NOT_FOUND', 'Resource not found');
  }
}

export class ValidationError extends BadRequest {
  constructor(details: Joi.ValidationErrorItem[]) {
    super('VALIDATION_FAILED', 'Invalid request data', details);
  }
}
