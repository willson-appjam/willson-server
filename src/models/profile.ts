import { rejects } from "assert";
import { resolve } from "path";

const selectUserProfileList = (connection: any, {question_idx}: any) => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			u.nickname,
			u.gender,
			u.age,
			c.category_name,
			cL.categoryList_name,
			q.weight,
			q.content,
			q.helper_gender,
			q.emotion,
			q.advise,
			q.experience
		FROM
			question q,
			category c,
			categoryList cL,
			user u
		WHERE
			q.user_idx = u.user_idx
			and q.categoryList_idx = cL.categoryList_idx
			and cL.category_idx = c.category_idx
			and question_idx = ?
		`
	connection.query(query, [question_idx], (err: Error, result: {}[]) => {
		if(err) reject(err)
		resolve(result)
		})
	})
}

const selectPersonality = (connection: any, {question_idx}: any) => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			p.personality_name
		FROM
			question q,
			personality p,
			question_personality qp
		WHERE
			q.question_idx = qp.question_idx
			and p.personality_idx = qp.personality_idx
			and qp.question_idx = ?
		`
		connection.query(query, [question_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

const selectFeeling = (connection: any, {question_idx}: any) => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			f.feeling_name
		FROM
			question q,
			feeling f,
			question_feeling qf
		WHERE
			q.question_idx = qf.question_idx
			and f.feeling_idx = qf.feeling_idx
			and qf.question_idx = ?
		`
		connection.query(query, [question_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
	})
})}

const selectExperience = (connection: any, {question_idx}: any) => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			e.experience_name
		FROM
			question q,
			experience e,
			question_experience qe
		WHERE
			q.question_idx = qe.question_idx
			and e.experience_idx = qe.experience_idx
			and q.question_idx = ?
		`
		connection.query (query, [question_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

const selectUserPersonality = (connection: any, {question_idx}: any) => {
	return new Promise((resolve, reject) : any => {
		const query = `
		SELECT
			p.personality_name
		FROM
			personality p,
			user_personality up,
			question q
		WHERE
			p.personality_idx = up.personality_idx
			and q.user_idx = up.user_idx
			and q.question_idx = ?
		`
		connection.query (query, [question_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

export {
	selectUserProfileList,
	selectPersonality,
	selectFeeling,
	selectExperience,
	selectUserPersonality
}