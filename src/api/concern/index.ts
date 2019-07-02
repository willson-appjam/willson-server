import express from 'express';

import {getCategoryList, postCategoryList } from './category/category.ctrl';
import { getFeelingList } from './feeling/feeling.ctrl';
import { getUserQuestionList, postUserQuestion } from './question/question.ctrl';
import authCheck from '../../lib/authCheck'

const concern = express.Router();

concern.get('/category/:category_idx', authCheck, getCategoryList);
concern.post('/category', postCategoryList);

concern.get('/feeling', getFeelingList);

concern.post('/question', postUserQuestion);
concern.get('/list', authCheck, getUserQuestionList);

export default concern;