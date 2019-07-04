import express from 'express';
import {getListCtrl} from './review/review.ctrl';
import { resFormat } from '../../lib/middlewares/respond';


const review = express.Router()

review.get('/:helper_idx/review', getListCtrl);

export default review