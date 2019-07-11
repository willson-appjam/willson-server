import express from 'express';
import { putMatchingStatus } from './matching.ctrl'

import authCheck from '../../lib/authCheck';
// postSignupCtrl 추가하기

const matching = express.Router()

matching.put('/:matching_idx', authCheck, putMatchingStatus)

export default matching