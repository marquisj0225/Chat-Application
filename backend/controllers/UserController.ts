import { Request, Response, NextFunction } from 'express';

const User = require('../models/User');

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const users = await User.query().whereNotDeleted();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({ err: err, mes: 'there was an error' });
  }
}
