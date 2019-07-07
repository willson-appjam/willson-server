import express from 'express';
import {postRegistrationCtrl} from '../registration/registration.ctrl';
import authCheck from '../../../lib/authCheck';

const registration = express.Router();

registration.post('/', authCheck, postRegistrationCtrl);

export default registration
