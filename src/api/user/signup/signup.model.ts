 const insertUserInfo = (connection: any, {nickname, gender, age, email, password, device_token, salt}: any) : Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
		INSERT INTO 
			user(
				nickname,
				gender,
				age, 
				email,
				password,
				device_token,
				salt
			)
		VALUES(?,?,?,?,?,?,?)
		`

		connection.query(query, [nickname, gender, age, email, password, device_token, salt], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

const insertUserPersonality = (connection: any, user_personality: any, user_idx: any, cr_user: any) : Promise<{}> => {
	return new Promise((resolve, reject) : any => {
		const query = `
		INSERT INTO 
			user_personality(personality_idx, user_idx, cr_user)
		VALUES(?,?,?)
		`
		connection.query(query, [user_personality, user_idx, cr_user], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

const selectCheckEmail = (connection : any, {email} : any) : Promise<{}> => 
{
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT *
		FROM
			user
		WHERE
			email = ?
		`
		connection.query(query, [email], (err:Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

export {
	insertUserInfo,
	selectCheckEmail,
	insertUserPersonality
}
