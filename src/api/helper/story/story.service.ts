import dbConnection from "../../../lib/connection";
import {selectStoryHelper} from '../helper.model';
import { CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from '../../../lib/serviceStatusCode';
import _ from 'lodash'

const getStoryService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        let result = []
        for (let i= 1; i<6; i++){
          const helper: any = await selectStoryHelper(connection, i);
          if (helper[0] == null){
            reject(new CustomError(null, 1301 , { helper, i }))
            return
          }
          result.push(helper[0]);
        }
        
        resolve(result);

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

  export default{
    getStoryService
  }
