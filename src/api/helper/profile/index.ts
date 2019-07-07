import express from 'express';
import {getProfileCtrl, putProfileCtrl} from '../profile/profile.ctrl';
import authCheck from '../../../lib/authCheck'

const profile = express.Router();

profile.get('/:helper_idx', getProfileCtrl);
profile.put('/', authCheck, putProfileCtrl);

export default profile