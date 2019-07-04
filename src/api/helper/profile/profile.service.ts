import dbConnection from "../../../lib/connection";
import { selectProfileHelper_idx, selectProfileHelper_experience, selectProfileHelper, insertRegistrationCategorylist, updateProfileHelper_experience, selectProfileExperience, selectRegistrationExperience, insertRegistrationExperience, selectLastInsert,selectRegistrationCategorylist, updateProfileHelper } from '../../../models/helper'

const getProfileService = (req: any,res: any) => 
  new Promise(async (resolve, reject) => {
    try {
       
      const helper_idx = req.params;
      const connection = await dbConnection();
      const helper = await selectProfileHelper(connection, helper_idx.helper_idx);
      const experience = await selectProfileExperience(connection, helper_idx.helper_idx);
      
      resolve({helper, experience});
    } catch (e){
      reject(e);   
    } finally {
      
    }
  })

const putProfileService = (req: any, res: any) =>
  new Promise(async (resolve, reject) => {
    try{
      const { helper, experience } = req.body;
      const connection = await dbConnection();

      //카테고리 리스트 업데이트(categoryList_name을 받아서 업데이트)
      let categorylist_idx: any = await selectRegistrationCategorylist(connection, helper.categoryList_name);
      if (!categorylist_idx.length) {
        await insertRegistrationCategorylist(connection, helper);
        categorylist_idx = await selectLastInsert(connection);
      }
      
      helper.categorylist_idx = categorylist_idx[0].idx;
      delete helper.categoryList_name;
      let user_idx = helper.user_idx;
      delete helper.user_idx;
      helper.user_idx = user_idx;

      await updateProfileHelper(connection,Object.values(helper));

      const helper_idx: any = await selectProfileHelper_idx(connection, helper.user_idx);
      const old_experience_idx: any =  await selectProfileHelper_experience(connection, helper_idx[0].helper_idx);
      for (let i=0; i<3; i++){
      let experience_idx: any = await selectRegistrationExperience(connection, experience.experience_name[i]);
      if (!experience_idx.length){
        await insertRegistrationExperience(connection, experience.experience_name[i])
        experience_idx = await selectLastInsert(connection);
      } 
      await updateProfileHelper_experience(connection, [experience_idx[0].idx, old_experience_idx[i].experience_idx]);
    }
    resolve({});
  
      
    }

    catch (e){
      
    }finally{

    }
  })

export default {
  getProfileService,
  putProfileService
}