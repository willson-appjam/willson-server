import dbConnection from "../../../lib/connection";
import {selectStoryHelper} from '../../../models/helper';

const getStoryService = (req: any,res: any) => 
  new Promise(async (resolve, reject) => {
    try {
      const connection = await dbConnection();

      let result = []
      for (let i= 0; i<5; i++){
        const helper = await selectStoryHelper(connection, i);
        result.push(helper);
      }
      resolve({result});
    } catch (e){
      
    } finally {
      
    }
  })


  export default{
    getStoryService
  }
