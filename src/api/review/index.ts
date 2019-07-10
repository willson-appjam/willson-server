import express from 'express';
import {postReviewCtrl, putReviewCtrl, getMainReviewCtrl} from './review.ctrl';
import authCheck from '../../lib/authCheck';

const review = express.Router()

review.post('/', authCheck, postReviewCtrl);
review.put('/:review_idx', authCheck, putReviewCtrl);
review.get('/story',getMainReviewCtrl);

export default review