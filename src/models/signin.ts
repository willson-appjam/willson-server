const selectUserInformation = (connection: any, {email}: any) : Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT *
		FROM user
		WHERE email = ?
		`
		connection.query(query, [email], (err:Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

const selectUserPassword = (connection: any, {password}: any) : Promise<{}> => {
	return new Promise((resolve, reject): any => {
		const query = `
		SELECT
			password,
			user_idx
		FROM
			user
		WHERE
			password = ?
		`

		connection.query(query, [password], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

export{
	selectUserInformation,
	selectUserPassword
}