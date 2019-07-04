import _ from 'lodash'
import { start } from 'repl';

const insertHelperReview = (connection: any, {stars, review_content, helper_idx, question_idx, category_idx}: any, {user_idx}: any) :Promise<{}> => {
	return new Promise((resolve, reject) : any  => {
		//const value = _.map(body, (v) => v)
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


const updateReview = (connection: any, {stars}: any, {review_content}: any, {review_idx}: any, {user_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE
			review
		SET
			stars = ?,
			review_content = ?
		WHERE
			review_idx = ?
			and user_idx = ?
		`
		connection.query(query, [stars, review_content, review_idx, user_idx], (err: Error, result: {}[]) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

export{
	insertHelperReview,
	updateHelperReviewCount,
	selectAvgStars,
	updateAvgStars,
	updateReview
}