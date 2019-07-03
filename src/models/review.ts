import _ from 'lodash'
import { start } from 'repl';

const insertHelperReview = (connection: any, body: any) :Promise<{}> => {
	return new Promise((resolve, reject) : any  => {
		const value = _.map(body, (v, k, index) => v)
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
		const Query = connection.query(query, value, (err: Error, result:{}[]) => {
			console.log(Query.sql)
			if(err) reject(err) 
			resolve(result)
		})
	})
};

//후기가 등록되었을때 count +1
const updateHelperReviewCount = (connection: any, {helper_idx}: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE helper
		SET review_count = review_count+1
		WHERE helper_idx = ?
		`
		connection.query(query, [helper_idx], (err: Error, result: {}[]) => {
			if(err) reject({
				message: 'database error',
				err,
			});
			resolve(result)
		} )
	})
}

//후기 등록됐을 때 평점 평균값 업데이트 해주기
//평균 값 구하기
const selectCountReview = (connection: any, { helper_idx }: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		SELECT ROUND(avg(stars), 2) AS stars
		FROM review
		WHERE helper_idx = ${helper_idx}
		`
		connection.query(query, (err:Error, result: {}[]) => {
			if(err) reject(err);
			console.log(result)
			resolve(result)
		})
	})
}

const updateAvgstar = (connection : any, { helper_idx } : any, { stars }: any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE helper
		SET stars = ${stars}
		WHERE helper_idx = ${helper_idx}
		`

		connection.query(query, (err:Error, result: {}[]) => {
			if(err) reject(err);
			console.log(result)
			resolve(result)
		})
	})
}

//req.params
const updateReview = (connection: any, {stars} : any, {review_content} :any, {review_idx} : any) => {
	return new Promise((resolve, reject) => {
		const query = `
		UPDATE review
		SET stars = ${stars} , review_content = "${review_content}"
		WHERE review_idx = ${review_idx}
		`
		connection.query(query, (err:Error, result: {}[]) => {
			if(err) reject(err);
			console.log(result)
			resolve(result)
		})
	})

}

export  {
	insertHelperReview,
	updateHelperReviewCount,
	selectCountReview,
	updateAvgstar,
	updateReview
}