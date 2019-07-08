import dbConnection from "../../../lib/connection";
import {selectStoryHelper} from '../../../models/helper';
import serviceStatusCode from '../../../lib/serviceStatusCode';
import _ from 'lodash'

const getStoryService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try {
      let result = []
      for (let i= 1; i<6; i++){
        const helper: any = await selectStoryHelper(connection, i);
        if (helper[0] == null){
          reject({code: serviceStatusCode["MISSING_HELPER_STORY"]})
          return
        }
        result.push(helper[0]);
      }
      
      resolve(result);
    } catch (e){
      reject(e);
    } finally {
      connection.release();
    }
  })
}

  export default{
    getStoryService
  }
