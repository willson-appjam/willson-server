import express from 'express';
import _ from 'lodash';

const respondBasic = (res: express.Response, code: number, data: object) => {
  res
    .status(200)
    .send({
      code,
      data: data || {},
  })
}

const respondOnError = (res: express.Response, code: any, status: number, result?: object) => {

  console.error('STATUS => ', status)
  console.error('CODE => ', code)
  console.error('RESULT => ', result)

  res.status(status).send({
    code,
    result,
    data: result || {},
  })
}

const CustomError = class CustomError extends Error {
  
  public code: number;
  public status: number;
  public data: object

  constructor(code: number, status: number, data: Object) {
    super();
    this.code = code
    this.status = status
    this.data = data

    const defaultOptions = {
      code: 10,
      message: '',
      status: 500,
      data: {},
      logMessage: 'Doesn\'t have any Message',
    }

    const customError = {
      code,
      message: JSON.stringify(''),
      status: 500,
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

