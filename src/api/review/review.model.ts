import _ from 'lodash'
import { start } from 'repl';
import { resolveCname } from 'dns';

const insertHelperReview = (connection: any, {stars, review_content, helper_idx, question_idx, category_idx}: any, {user_idx}: any) :Promise<{}> => {
	return new Promise((resolve, reject) : any  => {
		const query = `
		INSERT INTO
			review(
				stars, 
				review_content,
				helper_idx,
				user_idx,
				question_idx,
				category_idx
				)
			VALUES (?,?,?,?,?,?)
			`
		connection.query(query, [stars, review_content, helper_idx, user_idx, question_idx, category_idx], (err: Error, result:{}[]) => {
			if(err) reject(err) 
			resolve(result)
		})
	})
}


const updateHelperReviewCount = (connection: any, {helper_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE
			helper
		SET
			review_count = review_count+1
		WHERE
			helper_idx = ?
		`
		connection.query(query, [helper_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}


const selectAvgStars = (connection: any, {helper_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		SELECT
			ROUND(avg(stars), 2) AS stars
		FROM
			review
		WHERE
			helper_idx = ?
		`
		connection.query(query, [helper_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}


const updateAvgStars = (connection: any, {stars}: any, {helper_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE
			helper
		SET
			stars = ?
		WHERE
			helper_idx = ?
		`
		connection.query(query, [stars, helper_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}


const selectIdxFromReview = (connection: any, {review_idx}: any, {user_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		SELECT
			review_idx, user_idx
		FROM
			review
		WHERE
			review_idx = ? 
			and user_idx = ?
		`
		connection.query(query, [review_idx, user_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}


const updateHelperReview = (connection: any, {stars, review_content}: any, {user_idx}: any ) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE
			review
		SET
			stars = ?,
			review_content = ?
		WHERE
			user_idx = ?
		`
		connection.query(query, [stars, review_content, user_idx], (err: Error, result: {}[]) => {
			if(err) reject(err)
			resolve(err)
		})
	})
}

const selectMainReviewList = (connection: any, i: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		SELECT
			c.category_name,
			rs.content,
			rs.nickname
		FROM
			review_story rs, category c
		WHERE
			rs.category_idx = c.category_idx and c.category_idx = ?
		ORDER BY
			rand() limit 1
		`

		connection.query(query, i, (err:Error, result: {}[]) => {
			if(err) reject(err)
			resolve(result)
		})
	})
}

export{
	insertHelperReview,
	updateHelperReviewCount,
	selectAvgStars,
	updateAvgStars,
	selectIdxFromReview,
	updateHelperReview,
	selectMainReviewList
}