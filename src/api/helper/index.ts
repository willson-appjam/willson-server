import express from 'express';
import registration from './registration'
import profile from './profile';
import story from './story';
import selection from './selection';
import list from './list';
import myprofile from './myprofile';
import { getListCtrl } from './review/review.ctrl';
import { getHelperCheck } from './helper.ctrl';
import authCheck from '../../lib/authCheck';

const helper = express.Router();


helper.use('/registration', authCheck, registration);
helper.use('/myprofile', authCheck, myprofile);
helper.use('/profile', authCheck, profile);
helper.use('/story', story);
helper.use('/selection', authCheck, selection);
helper.use('/list', authCheck, list);

helper.get('/check', authCheck, getHelperCheck);
helper.get('/:helper_idx/review', authCheck, getListCtrl);


export default helper
