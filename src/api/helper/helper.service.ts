import dbConnection from "../../lib/connection";
import {selectStoryHelper, selectHelperExist} from './helper.model';
import { CustomError } from '../../lib/middlewares/respond';
import serviceStatusCode from '../../lib/serviceStatusCode';
import _ from 'lodash'

const getHelperExist = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const { user } = req

    const connection: any = await dbConnection();
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const [check]: any = await selectHelperExist(connection, user);
      
        resolve({
          status: check.status,
        });

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
  getHelperExist
}
