import { Request, Response } from 'express';

const register = (req: Request, res: Response): void => {
  res.send('registration work');
};


export const authController = {
  register
}