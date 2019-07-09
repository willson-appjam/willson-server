const selectReviewList = (connection : any, {helper_idx}: any): Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			r.review_idx,
			r.stars,
			r.review_content,
			r.write_date,
			c.category_name,
			u.nickname,
			h.helper_idx
		FROM
			review r,
			user u, 
			helper h, 
			category c
		WHERE
			r.helper_idx = h.helper_idx
			and r.user_idx = u.user_idx
			and r.category_idx = c.category_idx 
			and r.helper_idx = ?
		`

		connection.query(query, [helper_idx], (err: Error, result: {}[]) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

export{
	selectReviewList
}