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

export{
	updateMatchingStatus
}