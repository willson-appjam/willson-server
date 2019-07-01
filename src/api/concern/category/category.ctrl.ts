import express from 'express';
import categoryService from './category.service';

const getCategoryList = async (req: express.Request, res: express.Response) => {

  await categoryService.getCategoryListService(req, res)
  .then((result: any) => {
    res.send(result)
  })
  .catch((e: Error) => {
    res.send(e)
  })
}

const postCategoryList = async (req: express.Request, res: express.Response) => {

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