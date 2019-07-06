import express from 'express';
import {getStoryCtrl} from '../story/story.ctrl';

const story= express.Router();

story.get('/', getStoryCtrl);

export default story