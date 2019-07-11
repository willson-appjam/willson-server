import express from 'express';

import { getFeelingList } from './feeling/feeling.ctrl';
import { getPersonalityList } from './personality/personality.ctrl';
import { getCategoryList, postCategoryList } from './category/category.ctrl';
import { getUserQuestionList, postUserQuestion, putUserQuestion } from './question/question.ctrl';


import authCheck from '../../lib/authCheck'

const concern = express.Router();

concern.get('/category/:category_idx', authCheck, getCategoryList);
concern.post('/category', authCheck, postCategoryList);

concern.get('/feeling', authCheck, getFeelingList);

concern.get('/personality', authCheck, getPersonalityList);

concern.post('/question', authCheck, postUserQuestion);
concern.put('/question', authCheck, putUserQuestion);

concern.get('/list', authCheck, getUserQuestionList);

export default concern;