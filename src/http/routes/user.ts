import { Request, Response, NextFunction, Router } from 'express';
import { UsersController } from '../controllers/users';

export const UserRoutes = Router();

UserRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await UsersController.get(req, res, next);
});
