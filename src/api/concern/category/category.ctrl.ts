import express from 'express';
import categoryService from './category.service';
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { isValidCheck } from '../../../lib/isValidation';

const getCategoryList = async (req: any, res: any) => {
  
  const { category_idx } = req.params;

  if(!category_idx) {
    respondOnError(res, new Error('validation error'), serviceStatusCode['GET_CATEGORY_LIST_VALIDATION_ERROR'], 500);
    return;
  }

  await categoryService.getCategoryListService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_CATEGORY_LIST_SUCCESS'], result)
  })
  .catch((e: any) => {
    console.log(e)
    respondOnError(res, e, e.code, 500);
  })
}

const postCategoryList = async (req: any, res: any) => {

  const { body } = req

  if(!isValidCheck(body)) {
    respondOnError(res, new Error('validation error'), serviceStatusCode['POST_CATEGORY_LIST_VALIDATION_ERROR'], 500);
  }

  await categoryService.postCategoryListService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['POST_CATEGORY_LIST_SUCCESS'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
}


export {
  getCategoryList,
  postCategoryList,
}