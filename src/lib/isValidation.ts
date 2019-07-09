import _ from 'lodash'
import empty from 'is-empty'
import { CustomError } from './middlewares/respond';

const isValidCheck = ({ body } : any) => {
  let flag = true;
  
  _.forEach(body, (value, key) => {
    if(value instanceof Object) { 
      _.forEach(value, (v) => {
        if(empty(v) || v == null || v  === '' || v === undefined) {
          flag = false;
        }
      })
    }
    
    if(empty(value)) {
      flag = false;
    }

  })
  return flag;
}

export {
  isValidCheck,
}