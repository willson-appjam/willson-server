import express from 'express';
import {postSelectionCtrl} from '../selection/selection.ctrl';

const selection = express.Router();

selection.post('/', postSelectionCtrl);

export default selection