import express from 'express'
import empty from 'is-empty'

import token from './middlewares/token'
import { key } from '../../secret/aesKey'

import { respondBasic, respondOnError } from '../lib/middlewares/respond';
import { NextFunction } from 'express-serve-static-core';

export default async (req: any, res: any, next: NextFunction) => {
  
  const webToken: any = req.headers['willson-token'];
  
  try {
    console.log(webToken);
    if (empty(webToken)) req.user = { user_id: 0 }
    else req.user = await token.decode(webToken, key)
    await next()
    
  } catch (e) {
    respondOnError(res, e, 100, 500);
  }
}
