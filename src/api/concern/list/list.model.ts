import mysql from "mysql";

const selectCategoryListWithId = (connection: any, category_idx: any): Promise<{}>=> {
  return new Promise((resolve, reject) => {
    // 성별이랑 대분류가 같은사람
    const query = `
    SELECT
      *
    FROM
      categoryList cl
    INNER JOIN
      category c on cl.category_idx = c.category_idx
    INNER JOIN
      helper h on c.category_idx = h.category_idx
    INNER JOIN
      user u on u.user_idx = h.user_idx
    WHERE
      u.gender = ? AND c.category_idx = (SELECT category_idx FROM helper WHERE user_idx = ? )
  `
    const Query = connection.query(query, [category_idx], (err: Error, result: Array<any>) => {
      if(err) {
        reject(err)
       }
       resolve(result)
    })
  })
}