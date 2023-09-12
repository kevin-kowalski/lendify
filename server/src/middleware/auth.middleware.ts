import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Context, Next } from 'koa';
import { findUserById } from '../models/user.model';

dotenv.config();
const secretKey = process.env.JWT_SECRET as string;

export async function authenticate (ctx: Context, next: Next): Promise<void> {
  const token = ctx.headers.cookie?.split(';')[0].split('=')[1];
  console.log('token', token);
  console.log('cookie', ctx.headers.cookie);

  if (!token) ctx.throw(401, { message: 'No token provided.' });
  
  try {
    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
    const userExists = await findUserById(decodedToken.userId);

    if (userExists) {
      ctx.userId = decodedToken.userId;
      ctx.location = decodedToken.geoLocation;
      next()
    }
  } catch (error) {
    ctx.throw(401, { message: 'Invalid token.' });
  }
}