import express from 'express';
import registration from './registration'
import profile from './profile';
import story from './story';
import selection from './selection';
import list from './list';


const helper = express.Router();


helper.use('/registration', registration);
helper.use('/profile', profile);
helper.use('/story', story);
helper.use('/selection', selection);
helper.use('/list', list);

export default helper