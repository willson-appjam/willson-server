import dbConnection from "../../lib/connection";
import { updateMatchingStatus } from './matching.model';
import { CustomError } from '../../lib/middlewares/respond';
import serviceStatusCode from '../../lib/serviceStatusCode';
import _ from 'lodash'

const putMatchingStatus = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const { user, params } = req
    const connection: any = await dbConnection();

    try {
      const mResult: any = await updateMatchingStatus(connection, params);
      if(mResult.affectedRows === 0) {
        reject(new CustomError({}, 2602, params))
      }

      resolve();

    } catch (e){
      reject(e);
    } finally {
      connection.release();
    }
  })
}

export default {
  putMatchingStatus,
}
