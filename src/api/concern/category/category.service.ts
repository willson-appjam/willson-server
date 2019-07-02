import express from 'express';
import dbConnection from '../../../lib/connection';
import categoryModel from '../../../models/category.model';

const getCategoryListService = (req: express.Request, res: express.Response) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    try {
      const { category_idx } = req.params;

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

      let categoryList = null;

      if(resultCategory.length === 0) {
        categoryList = await categoryModel.insertCategoryList(connection, data);
      } else {
        categoryList = await categoryModel.updateCategoryListCount(connection, resultCategory[0])
      }

      resolve(categoryList);

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