import express from 'express';
import {postRegistrationCtrl} from '../registration/registration.ctrl';

const registration = express.Router();

registration.post('/', postRegistrationCtrl);

export default registration
