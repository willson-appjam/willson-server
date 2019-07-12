const insertUserSelection = (connection: any, {helper_idx, question_idx}: any, {user_idx}: any) : Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
		INSERT INTO 
			matching(
        user_idx,
        helper_idx,
				question_idx,
				cr_user
			)
		VALUES(?,?,?,?)
		`

		connection.query(query, [helper_idx, question_idx, user_idx, user_idx], (err: Error, result: {}[]) => {
      console.log(err);
			if(err) reject(err)
			resolve(result)
		})
	})
}

const selectHelperMatchingStatus = (connection: any, {helper_idx }: any) : Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
      SELECT
        *
      FROM
        matching
      WHERE
        helper_idx = ? AND status = 'doing'
		`
		connection.query(query, [helper_idx], (err: Error, result: {}[]) => {
      console.log(err);
			if(err) reject(err)
			resolve(result)
		})
	})
}

export {
  insertUserSelection,
  selectHelperMatchingStatus,
}