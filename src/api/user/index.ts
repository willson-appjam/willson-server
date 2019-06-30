import express from 'express';
import { postSigninCtrl } from './sign/sign.ctrl';
import { resFormat } from '../../lib/middlewares/respond';

const sign = express.Router()


sign.get('/signin', postSigninCtrl);

export default sign
