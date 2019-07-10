import dbConnection from "../../lib/connection";
import {selectStoryHelper, selectHelperExist} from './helper.model';
import { CustomError } from '../../lib/middlewares/respond';
import serviceStatusCode from '../../lib/serviceStatusCode';
import _ from 'lodash'

const getHelperExist = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const { user } = req

    const connection: any = await dbConnection();

    try {
      const [check]: any = await selectHelperExist(connection, user);
      
      resolve({
        status: check.status,
      });

    } catch (e){
      reject(e);
    } finally {
      connection.release();
    }
  })
}

export default{
  getHelperExist
}
