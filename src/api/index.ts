// const express = require('express')
import express from 'express';
import user from './user'
import review from './review'
import helper from './helper'

const router = express.Router()

router.use('/user', user);
router.use('/review', review);
router.use('/helper', helper);

export default router;