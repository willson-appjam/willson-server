import mysql from "mysql";

const selectCategoryListWithId = (connection: any, category_idx: any): Promise<{}>=> {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      categoryList_idx, categoryList_name
    FROM
      categoryList
    WHERE
      category_idx = ?
  `
    const Query = connection.query(query, [category_idx], (err: Error, result: Array<any>) => {
      if(err) {
        reject(err)
       }
       resolve(result)
    })
  })
}

const selectCategoryListWithName = (connection: any, { categoryList_name } : any): Promise<Array<{}>>=> {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        categoryList_idx, categoryList_name
      FROM
        categoryList
      WHERE
        categoryList_name LIKE '%${categoryList_name}%'
  `
    connection.query(query, (err: Error, result: Array<any>) => {
      err ? reject(err) : resolve(result)
    })
  })
}


const insertCategoryList = (connection: any, { category_idx, categoryList_name }: any): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO
      categoryList(category_idx, categoryList_name)
    VALUES
      (?, ?)
  `
    connection.query(query, [category_idx, categoryList_name], (err :Error, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const updateCategoryListCount = (connection: any, { categoryList_idx }: any): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE
        categoryList
      SET
        count = count + 1
      WHERE
        categoryList_idx = ?
    `
    const Query = connection.query(query, [categoryList_idx],(err :Error, result: any) => {
      if(err) {
        console.log(Query.sql);
        reject(err)
      }
      resolve(result)
    })
  })
}

export default {
  selectCategoryListWithId,
  selectCategoryListWithName,
  insertCategoryList,
  updateCategoryListCount,
}
