import _ from 'lodash'
import { CustomError } from './middlewares/respond';

const isValidCheck = ({ body } : any) => {
  let flag = true;

  _.forEach(body, (value, key) => {
    if(!value) {
      return false
    }
  })
  return flag;
}

export {
  isValidCheck,
}