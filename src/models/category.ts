import mysql from "mysql";

const selectCategoryListWithId = (connection: any, { category_idx } : any): Promise<{}>=> {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      *
    FROM
      categoryList
    WHERE
      category_idx = ?
  `
    connection.query(query, category_idx ,(err: Error, result: Array<any>) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const selectCategoryListWithName = (connection: any, { categoryList_name } : any): Promise<Array<{}>>=> {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      *
    FROM
      categoryList
    WHERE
      category_name LIKE %?%
  `
    connection.query(query, categoryList_name ,(err: Error, result: Array<any>) => {
      err ? reject(err) : resolve(result)
    })
  })
}


const insertCategoryList = (connection: any, { category_idx, categoryList_name }: any): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO
      categoryList(categoryList_name, category_idx)
    VALUES
      (?, ?)
  `
    connection.query(query, [],(err :Error, result: any) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default {
  selectCategoryListWithId,
  selectCategoryListWithName,
  insertCategoryList,
}
