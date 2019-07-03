// const express = require('express')
import express from 'express';
import user from './user'
import review from './review'
import helper from './helper'

const router = express.Router()

<<<<<<< HEAD
=======
router.get('/test', (req: any, res: any) => {
  res.send('test');
})

>>>>>>> 079a2ce8a16eef9cf8451bd663a96d325cf979aa
router.use('/user', user);
router.use('/review', review);
router.use('/helper', helper);

export default router;