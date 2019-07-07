import express from 'express';
import registration from './registration'
import profile from './profile';
import story from './story';
import selection from './selection';
import list from './list';
import {getListCtrl} from './review/review.ctrl';


const helper = express.Router();


helper.use('/registration', registration);
helper.use('/profile', profile);
helper.use('/story', story);
helper.use('/selection', selection);
helper.use('/list', list);
helper.get('/:helper_idx/review', getListCtrl);

export default helper
