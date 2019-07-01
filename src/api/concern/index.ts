import express from 'express';

import {getCategoryList, postCategoryList } from './category/category.ctrl';
import { getFeelingList } from './feeling/feeling.ctrl';
import { getUserQuestionList, postUserQuestion } from './question/question.ctrl';
const concern = express.Router();

concern.get('/category/:category_idx', getCategoryList);
concern.post('/category', postCategoryList);

concern.get('/feeling', getFeelingList);

concern.post('/', postUserQuestion);
concern.get('/list', getUserQuestionList);

export default concern;