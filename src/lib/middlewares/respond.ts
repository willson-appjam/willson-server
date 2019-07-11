import express from 'express';
import _ from 'lodash';
import moment from 'moment'
import serviceStatusCode from '../../lib/serviceStatusCode'
import { prod } from '../../logger';


const respondBasic = (req: any, res: any, code: number, data: object) => {
  
  const time = Date.now() - req.start;
  
  console.log('')
  console.log('[REQ] =>', moment().format('YYYY-MM-DD HH:mm:ss'), req.method, req.originalUrl, 200, JSON.stringify(req.body), '-', time +'ms');
  console.log('')
  console.log('code => ', code)
  console.log('message => ', serviceStatusCode[`${code}`])
  console.log('data => ', data)
  console.log('')

  res
    .status(200)
    .send({
      code,
      message: serviceStatusCode[`${code}`],
      data: data || {},
  })
}

const respondOnError = (req: any, res: any, err: any, code: any, status: number = 500, result?: object) => {

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const time = Date.now() - req.start;  

  console.log('')
  console.log('[Req] =>',  moment().format('YYYY-MM-DD HH:mm:ss'), req.method, fullUrl, status, JSON.stringify(req.body), '-', time +'ms');
  console.log('code => ', code)
  console.log('message => ', serviceStatusCode[`${code}`])
  console.log('data => ', result)
  console.error('ERROR STACK => ', err)
  console.log('')

  res.status(status).send({
    code,
    message: serviceStatusCode[`${code}`],
    data: err.data || {},
  })
}

const CustomError = class CustomError extends Error {
  
  public code: number;
  public data: object
  public err: object;
  public own: string

  constructor(err: any, code: number, data: object) {
    super();
    this.code = code
    this.data = data
    this.err = err
    this.own = "CustomError"

    const defaultOptions = {
      err: 'internal server error',
      code: 10,
      message: '',
      data: {},
      logMessage: 'Doesn\'t have any Message',
    }

    const customError = {
      err: err || {},
      code,
      message: JSON.stringify(''),
      data: this.data,
      logMessage: '',
    }

    const temp = _.defaultsDeep(customError, defaultOptions)

  }
}


export {
  CustomError,
  respondBasic,
  respondOnError,
}

