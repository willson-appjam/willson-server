import express from 'express';
// import ctrl from './sign.ctrl';

const sign = express.Router()


sign.get('/signin', (req, res) => {
  res.send("signin success");
})

sign.get('/signup', (req, res) => {
  res.send("signup success");
})

sign.get('/signout', (req, res) => {
  res.send("signout success");
})


module.exports = sign
