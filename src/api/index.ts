// const express = require('express')
import express from 'express';
import user from './user'
import helper from './helper';

const router = express.Router()

router.use('/user', user);
router.use('/helper', helper);

export default router;