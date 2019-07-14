import listService from './list.service';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getListCtrl = async(req:any, res:any) => {
  new Promise(async (resolve, reject) => {
  const { user } = req

  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

    await listService.getListService(req, res)
  .then((result: any) => {
    respondBasic(req, res, 1000, result)
  })
  .catch((e: any) => {
    if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
		else respondOnError(req, res, e, 1002, 500);
  })
  })
};

export {
  getListCtrl
}

