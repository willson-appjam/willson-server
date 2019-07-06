import _ from 'lodash'

const isValidCheck = ({ body } : any) => {
  let flag = true;

  _.forEach(body, (value, key) => {
    console.log("key :", key, "value", value);
    if(!value) {
      return flag = false
    }
  })
  return flag;
}

export {
  isValidCheck,
}