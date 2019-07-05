import dbConnection from "../../../lib/connection";
import { insertRegistrationHelper, insertRegistrationExperience, insertRegistrationHelper_experience, selectRegistrationExperience, selectLastInsert, selectRegistrationCategorylist as selectRegistrationCategorylist, insertRegistrationCategorylist } from '../../../models/helper'

const postRegistrationService = (req: any,res: any) => {

  return new Promise(async (resolve, reject) => {

    const connection: any = await dbConnection();

    try {
      const { helper, experience } = req.body;

      let categoryList_idx: any = await selectRegistrationCategorylist(connection, helper.categoryList_name);
      //헬퍼의 카테고리 리스트 정보 등록
      if (!categoryList_idx.length) {
        await insertRegistrationCategorylist(connection, helper.categoryList_name);
        categoryList_idx = await selectLastInsert(connection);
      }
      helper.categoryList_idx = categoryList_idx[0].idx;
      delete helper.categoryList_name;
      await insertRegistrationHelper(connection, Object.values(helper));
      let helper_idx : any = await selectLastInsert(connection);
     
      //헬퍼의 경험 정보 등록
      for (let i=0; i<3; i++){
      let experience_idx: any = await selectRegistrationExperience(connection, experience.experience_name[i]);
      if (!experience_idx.length){
        await insertRegistrationExperience(connection, experience.experience_name[i])
        experience_idx = await selectLastInsert(connection);
        
      } 
      await insertRegistrationHelper_experience(connection, [experience_idx[0].idx, helper_idx[0].idx]);
      };
      
      resolve({});
    
    } catch (e) {
      reject(e)
    } finally {
      connection.end();
    }
  })
}

export default {
  postRegistrationService
}