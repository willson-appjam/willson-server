import express from 'express';
import categoryService from './category.service';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';

const getCategoryList = async (req: any, res: any) => {
  
  const { category_idx } = req.params;

  if(!category_idx) {
    respondOnError(req, res, new Error('validation error'), 401, 500);
    return;
  }

  await categoryService.getCategoryListService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 400, result)
  })
  .catch((e: any) => {
    respondOnError(req, res, e, 402);
  })
}

const postCategoryList = async (req: any, res: any) => {

  const { body } = req

  if(!isValidCheck(req)) {
    respondOnError(req, res, new Error('validation error'), 501);
  }

  await categoryService.postCategoryListService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 500, result)
  })
  .catch((e: any) => {
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code)
    else respondOnError(req, res, e, 502);
  })
}


export {
  getCategoryList,
  postCategoryList,
}