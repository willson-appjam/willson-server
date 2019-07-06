import express from 'express';
import {getListCtrl} from '../list/list.ctrl';

const list = express.Router();

list.get('/:question_idx', getListCtrl);

export default list