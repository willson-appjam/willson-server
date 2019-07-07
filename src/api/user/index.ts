import express from 'express';
import { postSigninCtrl } from './signin/signin.ctrl';
import { postSignupCtrl } from './signup/signup.ctrl';
import { getProfileCtrl } from './profile/profile.ctrl';
// postSignupCtrl 추가하기

const user = express.Router()
user.post('/signin', postSigninCtrl);
user.post('/signup', postSignupCtrl);
user.get('/profile/:question_idx', getProfileCtrl);

export default user