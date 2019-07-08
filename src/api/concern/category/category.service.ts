import express from 'express';
import dbConnection from '../../../lib/connection';
import categoryModel from '../../../models/category.model';
import serviceStatusCode from '../../../lib/serviceStatusCode'

const getCategoryListService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection = await dbConnection();
    try {
      const { category_idx } = req.params;
      const categoryList = await categoryModel.selectCategoryListWithId(connection, category_idx);
      
      resolve({ categoryList })

    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}


const postCategoryListService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    
    const connection = await dbConnection();
    
    try {
      const { body } = req;
      const resultCategory = await categoryModel.selectCategoryListWithName(connection, body);

      let categoryList: any = null;

      if(resultCategory.length === 0) {
        categoryList = await categoryModel.insertCategoryList(connection, body);
      } else {
        categoryList = await categoryModel.updateCategoryListCount(connection, resultCategory[0])
      }

      if(categoryList[0].affectedRows === 0) {
        reject({ code: serviceStatusCode['POST_CATEGORY_LIST_ERROR_ANYWAY'] })
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