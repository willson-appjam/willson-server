import dbConnection from "../../../lib/connection";
import { insertSelectionSelected_question } from '../../../models/helper';

const postSelectionService = (req: any,res: any) => 
  new Promise(async (resolve, reject) => {
    try {
      const connection = await dbConnection();
      const body = req.body;
      await insertSelectionSelected_question(connection, body);
      resolve({});
    } catch (e){
      
    } finally {
      
    }
  })


  export default{
    postSelectionService
  }