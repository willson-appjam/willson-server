import express from 'express';
import {postReviewCtrl, putReviewCtrl} from './review.ctrl';
import {resFormat} from '../../lib/middlewares/respond';
import authCheck from '../../lib/authCheck';

const review = express.Router()

review.post('/', authCheck, postReviewCtrl);
review.put('/:review_idx', authCheck, putReviewCtrl);

export default review