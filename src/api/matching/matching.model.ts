const updateMatchingStatus = (connection : any, { matching_idx }: any): Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
      UPDATE
        matching
      SET
        status = 'complete'
      WHERE
        matching_idx = ?
		`
		connection.query(query, [matching_idx], (err: Error, result: {}[]) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

const selectMatchingHistroy = (connection : any, { user_idx }: any): Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
      SELECT
        *
      FROM
        matching
      WHERE
        status ='doing' AND helper_idx = ?
		`
		connection.query(query, [user_idx], (err: Error, result: {}[]) => {
			if(err) reject(err);
			else resolve(result)
		})
	})
}

export{
  updateMatchingStatus,
  selectMatchingHistroy,
}