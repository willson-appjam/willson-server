import _ from 'lodash'

const isValidCheck = ({ body } : any) => {
  let flag = true;

  _.forEach(body, (value) => {
    console.log('validation => ', value)
    if(!value) {
      return flag = false
    }
  })
  return flag;
}

export {
  isValidCheck,
}