import dbConnection from "../../../lib/connection";
import { insertSelectionSelected_question, selectProfileHelper_idx,selectSelectionQuestion_idx } from '../helper.model';
import helper from "../index";
import { CustomError } from '../../../lib/middlewares/respond';
import serviceStatusCode from "../../../lib/serviceStatusCode"

const postSelectionService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try {
      const body = req.body;
      const {user} = req;

      let helper_idx: any = await selectProfileHelper_idx(connection, user.user_idx)
      if (!helper_idx.length){
        reject(new CustomError(null, 1401, {}))
        
      }
      let question: any = await selectSelectionQuestion_idx(connection, body.question_idx)
      if (!question.length){
        reject(new CustomError(null, 1402, body))
        
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