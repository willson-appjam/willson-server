import express from 'express';

import categoryModel from './category.model';
import dbConnection from '../../../lib/connection';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import { CustomError } from '../../../lib/middlewares/respond';

const getCategoryListService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    try {
      const { category_idx } = req.params;
      const categoryList: any = await categoryModel.selectCategoryListWithId(connection, category_idx);
      
      resolve({
        categoryList,
        size: categoryList.length,
      })

    } catch (e) {
      reject(e)
    } finally {
      connection.release();
    }
  })
}


const postCategoryListService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    
    const connection: any = await dbConnection();
    
    try {
      const { body, user } = req;

      const resultCategory: any = await categoryModel.selectCategoryListWithName(connection, body);
      let categoryList: any = null;

      if(resultCategory.length === 0) {
        categoryList = await categoryModel.insertCategoryList(connection, body, user);
      } else {
        categoryList = await categoryModel.updateCategoryListCount(connection, resultCategory[0])
        categoryList.insertId = resultCategory[0].categoryList_idx;
      }

      if(categoryList.affectedRows === 0) {
        reject(new CustomError(null, 501, body))
      }

      resolve({
        categoryList_idx: categoryList.insertId,
      });

    } catch (e) {
      reject(e);
    } finally {
      connection.release();
    }
  })
}

export default {
  getCategoryListService,
  postCategoryListService,
}