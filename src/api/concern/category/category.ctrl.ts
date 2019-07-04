import express from 'express';
import categoryService from './category.service';

const getCategoryList = async (req: any, res: any) => {
  console.log(test)
  await categoryService.getCategoryListService(req, res)
  .then((result: any) => {
    res.send(result)
  })
  .catch((e: Error) => {
    res.send(e)
  })
}

const postCategoryList = async (req: any, res: any) => {

  await categoryService.postCategoryListService(req, res)
  .then((result: any) => {
    res.send(result)
  })
  .catch((e: Error) => {
    res.send(e)
  })
}


export {
  getCategoryList,
  postCategoryList,
}