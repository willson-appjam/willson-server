import express from 'express';
import serviceStatusCode from '../../lib/serviceStatusCode'
import _ from 'lodash';

const respondBasic = (res: express.Response, code: number, data: object) => {
  
  console.log('code => ', code)
  console.log('message => ', serviceStatusCode[`${code}`])
  console.log('data => ', data)

  res
    .status(200)
    .send({
      code,
      message: serviceStatusCode[`${code}`],
      data: data || {},
  })
}

const respondOnError = (res: express.Response, err: any, code: any, status : number = 500, result?: object) => {

  console.error('STATUS => ', status)
  console.error('CODE => ', code)
  console.error('RESULT => ', result || {})
  console.error('ERROR STACK => ', err)

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
  

  constructor(err: any, code: number, data: object) {
    super();
    this.code = code
    this.data = data
    this.err = err

    const defaultOptions = {
      err: 'internal server error',
      code: 10,
      message: 'internal server error',
      data: {},
      logMessage: 'Doesn\'t have any Message',
    }

    const customError = {
      err: err || {},
      code,
      message: serviceStatusCode[`${code}`],
      data: this.data,
      logMessage: '',
    }

    const temp = _.defaultsDeep(customError, defaultOptions)

    // Object.keys(defaultOptions).forEach((key) => {
    //   this[key] = temp[key]
    // })
  }
}


export {
  CustomError,
  respondBasic,
  respondOnError,
}

