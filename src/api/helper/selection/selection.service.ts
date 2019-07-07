import dbConnection from "../../../lib/connection";
import { insertSelectionSelected_question, selectProfileHelper_idx,selectSelectionQuestion_idx } from '../../../models/helper';
import helper from "../index";
import serviceStatusCode from "../../../lib/serviceStatusCode"

const postSelectionService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try {
      const body = req.body;
      const {user} = req;

      let helper_idx: any = await selectProfileHelper_idx(connection, user.user_idx)
      if (!helper_idx.length){
        reject({code:serviceStatusCode["SELECTION_HELPER_DOES_NOT_EXIST"]})
        
      }
      let question: any = await selectSelectionQuestion_idx(connection, body.question_idx)
      if (!question.length){
        reject({code:serviceStatusCode["HELPER_SELECTION_QUESTION_DOES_NOT_EXIST"]})
        
      }
      await insertSelectionSelected_question(connection, [helper_idx[0].helper_idx, body.question_idx]);
      resolve({});
    } catch (e){
      reject(e);
    } finally {
      connection.release();
    }
  })
}


  export default{
    postSelectionService
  }