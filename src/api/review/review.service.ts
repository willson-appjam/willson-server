import dbconnection from '../../lib/connection'
import {insertHelperReview,updateHelperReviewCount, selectAvgStars, updateAvgStars, selectIdxFromReview, updateHelperReview, selectMainReviewList}
from './review.model'
import serviceStatusCode from '../../lib/serviceStatusCode'
import { CustomError } from '../../lib/middlewares/respond'
import moment from 'moment'
import dbConnection from '../../lib/connection';



const postReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any>=>{
    const connection: any = await dbconnection()
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const { body, user } = req
			
        const connection: any = await dbconnection()
        const uploadReview = await insertHelperReview(connection, body, user)			
        const modifiedReviewCount = await updateHelperReviewCount(connection, body)		
        const avgStars : any = await selectAvgStars(connection, body)
        const modifiedAvgStars = await updateAvgStars(connection, avgStars[0], body)
  
        resolve({})
        await Promise.resolve(connection.commit())
      } catch (e) {
        await Promise.resolve(connection.rollback())
        reject(e)
      } finally {
        connection.release();
      }
    })
	})
}


const putReviewService = (req: any, res: any, next: any) => {
	return new Promise(async (resolve, reject) : Promise<any> => {
    const connection: any = await dbconnection()
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const {body, user, params } = req
        const idxFromReview: any = await selectIdxFromReview(connection, params, user)
        if (!idxFromReview[0]){
          reject(new CustomError(null, 1702, body))
        } else {
          const updateReview: any = await updateHelperReview(connection, body, user)
          resolve(updateReview)
        }
        await Promise.resolve(connection.commit())
      } catch (e) {
        await Promise.resolve(connection.rollback())
        reject(e)
      } finally {
        connection.release();
      }
    })
	})
}


const getMainListService = (req: any, res: any, next: any) : any => {
	return new Promise(async (resolve, reject ) : Promise<any> => {

		const connection: any = await dbconnection()
		try {
			const mainReviewList = []
      
      for(let i = 1; i < 6; i++) {
				const showMainReviewList : any = await selectMainReviewList(connection, i)
				mainReviewList.push(showMainReviewList[0])
      }
      
      resolve(mainReviewList)
      
	  } catch(e) {
		console.log(e)
		reject(e)
    } finally {
			connection.release()
		}
	})
}

export default{
	postReviewService,
	putReviewService,
	getMainListService
}