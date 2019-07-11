import express from 'express';
import {postSelectionCtrl} from '../selection/selection.ctrl';
import authCheck from '../../../lib/authCheck'

const selection = express.Router();

selection.post('/', authCheck, postSelectionCtrl);

export default selection