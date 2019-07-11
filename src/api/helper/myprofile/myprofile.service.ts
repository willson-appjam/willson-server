import dbConnection from "../../../lib/connection";
import { selectMyProfileExperience, selectMyProfileHelper } from '../helper.model'
import { CustomError } from '../../../lib/middlewares/respond';

const getMyprofileService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    
    try {
      const {user} = req;
      console.log(user.user_idx)
      const helper: any = await selectMyProfileHelper(connection, user.user_idx);
      if (!helper.length){
        reject(new CustomError(null, 2501 , req.params))
        return
      }
      const experience = await selectMyProfileExperience(connection, user.user_idx);

      resolve({helper, experience});
    } catch (e){
      reject(e);   
    } finally {
      connection.release();
    }
  })
}

export default {
  getMyprofileService
}