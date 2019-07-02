import express from 'express'
import empty from 'is-empty'

import token from './middlewares/token'
import { key } from '../../secret/aesKey'

import { respondBasic, respondOnError } from '../lib/middlewares/respond';
import { NextFunction } from 'express-serve-static-core';

export default async (req: any, res: any, next: NextFunction) => {
  
  const webToken: any = req.headers['willson-token'];
  
  try {
    
    if (empty(webToken)) {
      req.user = { user_id: 0 }
    } else {
      req.user = await token.decode(webToken, key)
    }

    return next()

  } catch (e) {
    console.log(e)
    respondOnError(req, 100, 'token decode error', 500);
  }
}
