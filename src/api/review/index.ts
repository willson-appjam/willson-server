import express from 'express';
import {postReviewCtrl, putReviewCtrl} from './review.ctrl';
import {resFormat} from '../../lib/middlewares/respond';

const review = express.Router()

review.post('/', postReviewCtrl);
review.put('/:review_idx', putReviewCtrl);

export default review