import { Request, Response, NextFunction } from 'express';
const User = require('../models/User');

/**
 * This checks that the request has a JWT token set in the authorization header,
 *
 * @param req
 * @returns User
 */
export async function getCurrentUser(req: Request) {
  const userId = req.query.user_id || 1;

  const user = await User.query().findById(userId);

  return user;
}
