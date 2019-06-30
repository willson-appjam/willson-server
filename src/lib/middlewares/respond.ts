import express from 'express';
import _ from 'lodash';

const respondBasic = (res: express.Response, code: number, message: string, data: object) => {
  res
    .status(200)
    .send({
      message,
      code,
      data,
  })
}

const respondOnError = (res: express.Response, code: number, message: string, status: number, result?: object) => {

  console.error('CODE: ', code)
  console.error('STATUS: ', status)
  console.error('MESSAGE: ', message)
  console.error('DATA: ', result)

  res.status(status).json({
    code,
    message: message,
    result,
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

const resFormat = (req: express.Request, res: express.Response) => {
  respondBasic(res, 12011, 'get Main list fail', {});
}

export {
  resFormat,
  CustomError,
  respondBasic,
  respondOnError,
}

