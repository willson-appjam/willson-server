import dbConnection from "../../../lib/connection";
import helperModel from '../helper.model'
import serviceStatusCode from '../../../lib/serviceStatusCode';
import { CustomError } from "../../../lib/middlewares/respond";

const postRegistrationService = (req: any,res: any, next: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const { helper, experience } = req.body;
        const { user } = req
        const { category_idx, categoryList_idx } = helper
    
        const uResult = await helperModel.selectHelperRegistStatus(connection, user);
        if(uResult) {
          throw new CustomError(null, 903, user)
        }
        //헬퍼 기본 정보 등록
        let helper_idx: any = await helperModel.insertRegistrationHelper(connection, [category_idx, categoryList_idx, helper.title, helper.content, user.user_idx, user.user_idx]);
        helper_idx = helper_idx.insertId;
  
        //헬퍼의 경험 정보 등록
        for (let i=0; i<3; i++){
          let experience_idx: any = await helperModel.selectRegistrationExperience(connection, experience.experience_name[i], user.user_idx);
          experience_idx = experience_idx.insertId;
          await helperModel.insertRegistrationHelper_experience(connection, [experience_idx, helper_idx, user.user_idx]);
        };
  
        resolve({helper_idx});
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
  postRegistrationService
}