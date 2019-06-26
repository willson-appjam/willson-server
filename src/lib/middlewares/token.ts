const jwt = require('jsonwebtoken')

exports.encode = function generateToken(secret : string, userId : String, level: string) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign({userId, level}, secret, {
      issuer: 'willson',
      algorithm: 'HS256',
      expiresIn: 3600 * 24 * 10 * 10, // 토큰의 유효기간이 100일
    }, (err : Error, token: string) => {
      err ? reject('encode token error') : resolve(token)
    })
  })
}

exports.decode = function decodedToken(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: Error, decoded: string) => {
      if(err) {
        if(err.message === 'jwt expired') reject('token expired')
        else if(err.message === 'invalid token') reject('invalid token')
      } else {
        resolve(decoded)
      }
    })
  })
}