// const express = require('express')
import express from 'express';
import user from './user'

const router = express.Router()

router.get('/test', (req: express.Request, res: express.Response) => {
  res.send('test');
})

router.use('/user', user);


export default router;