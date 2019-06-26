// const express = require('express')
import express from 'express';
import { Response } from 'superagent';

const router = express.Router()

router.get('/test', (req: express.Request, res: express.Response) => {
  res.send('test');
})


export default router;