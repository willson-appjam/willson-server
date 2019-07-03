import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import api from './api/index';

class App {

  public app: express.Application;

  constructor() {
    this.app =  express();
    
    // init middleware
    this.app.use(helmet());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/api', api);
    
    this.app.get('/check', (req: any, res: any, next: express.NextFunction) => {
        res.status(200).send("check success");
      });
  }
}

export default App;

// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const helmet = require('helmet');


// const router = express.Router();
// const app = express();

// const api = require('./api');
// const config = require('./config');


// app.use(bodyParser.json());
// app.use('/api', api);
// app.use(express.static(path.join(__dirname, 'public')))


// app.use((err, req, res) => {
  
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   res.status(err.status || 500)
//   res.render('error')
// })

// app.listen(3001, () => {
//   console.log('server running start port');
// })


// module.exports = app;

