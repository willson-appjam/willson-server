import express from 'express';
import dbConnection from '../../../lib/connection';
import categoryModel from '../../../models/category.model';

const getCategoryListService = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    try {

      const { category_idx } = req.body;
      const categoryList = await categoryModel.selectCategoryListWithId(connection, category_idx);
      resolve(categoryList)

    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}


const postCategoryListService = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    
    try {
      const data = req.body;
      const resultCategory = await categoryModel.selectCategoryListWithName(connection, data);

      if(resultCategory.length === 0) {
        const categoryList = await categoryModel.insertCategoryList(connection, data);
        
      } else {
        throw new Error('duplicate category');
      }
    } catch (e) {
      reject(e);
    } finally {
      connection.end();
    }
  })
}

export default {
  getCategoryListService,
  postCategoryListService,
}