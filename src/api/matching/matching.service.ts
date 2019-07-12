import dbConnection from "../../lib/connection";
import { updateMatchingStatus } from './matching.model';
import { CustomError } from '../../lib/middlewares/respond';
import serviceStatusCode from '../../lib/serviceStatusCode';
import _ from 'lodash'

const putMatchingStatus = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const { user, params } = req
    const connection: any = await dbConnection();
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const mResult: any = await updateMatchingStatus(connection, params);
        if(mResult.affectedRows === 0) {
          reject(new CustomError({}, 2602, params))
        }
  
        resolve();
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

export default {
  putMatchingStatus,
}
