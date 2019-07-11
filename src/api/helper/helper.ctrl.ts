import helperService from './helper.service';
import serviceStatusCode from '../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../lib/middlewares/respond';

const getHelperCheck = async (req: any, res: any) => {
  const { user } = req
  
  if(user.user_idx == 0) {
    respondOnError(req, res, new Error('NOT AUTHENTICATION USER'), 2, 500)
    return;
  }

  await helperService.getHelperExist(req, res)
    .then((result: any) => {
      respondBasic(req, res, 2400, result)
    })
    .catch((e: any) => {
      if (e.own === 'CustomError') respondOnError(req, res, e, e.code, 200)
      else respondOnError(req, res, e, 2401, 500);
    })
}

export {
  getHelperCheck
}
