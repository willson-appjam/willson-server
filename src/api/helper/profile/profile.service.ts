import dbConnection from "../../../lib/connection";
import { selectProfileHelper_idx, selectProfileHelper_experience, selectProfileHelper, selectRegistrationCategory, updateProfileHelper_experience, selectProfileExperience, selectRegistrationExperience, insertRegistrationCategoryList, insertRegistrationHelper_experience, updateProfileHelper, selectProfilePersonality } from '../../../models/helper'
import serviceStatusCode from '../../../lib/serviceStatusCode';

const getProfileService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();
    
    try {
      const helper_idx = req.params;
      const helper: any = await selectProfileHelper(connection, helper_idx.helper_idx);
      if (!helper.length){
        reject({code: serviceStatusCode["PROFILE_HELPER_DOES_NOT_EXIST"]})
        return
      }
      const experience = await selectProfileExperience(connection, helper_idx.helper_idx);
      const personality = await selectProfilePersonality(connection, helper_idx.helper_idx);

      resolve({helper, experience, personality});
    } catch (e){
      reject(e);   
    } finally {
      connection.release();
    }
  })
}

const putProfileService = (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try{
      const { helper, experience } = req.body;
      const { user } = req;
      
      //헬퍼 기본 프로필 업데이트
      let category_idx: any = await selectRegistrationCategory(connection, helper.category_name);
      category_idx = category_idx[0].category_idx;
      let categorylist_idx: any = await insertRegistrationCategoryList(connection, [helper.categoryList_name, category_idx]);
      categorylist_idx = categorylist_idx.insertId;

      await updateProfileHelper(connection,[category_idx, categorylist_idx, helper.title, helper.content, user.user_idx]);
      
      //헬퍼 경험 프로필 수정
      let helper_idx : any = await selectProfileHelper_idx(connection, user.user_idx);
      if (!helper_idx.length){
        reject({code: serviceStatusCode['USER_IS_NOT_HELPER']})
        return;
      }
      const old_experience_idx: any =  await selectProfileHelper_experience(connection, helper_idx[0].helper_idx);
      for (let i=0; i<3; i++){
        let experience_idx: any = await selectRegistrationExperience(connection, experience.experience_name[i]);
        experience_idx = experience_idx.insertId;
        await updateProfileHelper_experience(connection, [experience_idx, old_experience_idx[i].helper_experience_idx]);
      } 
      resolve({}); 
    }
    catch (e){
      reject(e);   
    }finally{
      connection.release();
    }
  })
}


export default {
  getProfileService,
  putProfileService
}