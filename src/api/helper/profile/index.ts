import express from 'express';
import {getProfileCtrl, putProfileCtrl} from '../profile/profile.ctrl';

const profile = express.Router();

profile.get('/:helper_idx', getProfileCtrl);
profile.put('/', putProfileCtrl);

export default profile