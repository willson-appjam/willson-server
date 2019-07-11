import express from 'express';
import {getMyprofileCtrl} from '../myprofile/myprofile.ctrl';
import authCheck from '../../../lib/authCheck';

const myprofile = express.Router();

myprofile.get('/', authCheck, getMyprofileCtrl);

export default myprofile