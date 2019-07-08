import listService from './list.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getListCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
    await listService.getListService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_HELPER_LIST_SUCCESS'], result)
  })
  .catch((e: any) => {
    respondOnError(res, e, e.code, 500);
  })
  })
};

export {
  getListCtrl
}

