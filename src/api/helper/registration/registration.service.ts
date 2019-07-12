import dbConnection from "../../../lib/connection";
import { selectRegistrationCategory, insertRegistrationCategoryList, insertRegistrationHelper, selectRegistrationExperience, insertRegistrationHelper_experience, } from '../helper.model'
import serviceStatusCode from '../../../lib/serviceStatusCode';
import { CustomError } from "../../../lib/middlewares/respond";

const postRegistrationService = (req: any,res: any, next: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    await connection.beginTransaction(async (err: Error) => {
      if (err) throw new CustomError(null, 0, {})
      
      try { 
        const { helper, experience } = req.body;
        const { user } = req;
    
        //헬퍼 기본 정보 등록
        let category_idx: any = await selectRegistrationCategory(connection, helper.category_name);
        category_idx = category_idx[0].category_idx;
        
        let categorylist_idx: any = await insertRegistrationCategoryList(connection, [helper.categoryList_name, category_idx, user.user_idx]);
        categorylist_idx = categorylist_idx.insertId;
  
        let helper_idx: any = await insertRegistrationHelper(connection, [category_idx, categorylist_idx, helper.title, helper.content, user.user_idx, user.user_idx]);
        helper_idx = helper_idx.insertId;
  
        //헬퍼의 경험 정보 등록
        for (let i=0; i<3; i++){
          let experience_idx: any = await selectRegistrationExperience(connection, experience.experience_name[i], user.user_idx);
          experience_idx = experience_idx.insertId;
          await insertRegistrationHelper_experience(connection, [experience_idx, helper_idx, user.user_idx]);
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