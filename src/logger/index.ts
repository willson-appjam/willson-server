import morgan from 'morgan'


// const stream = {
//   write: function (message: any, encoding: any) {
//       logger.silly(message);
//   }
// };

const formatMaker = function (tokens: any, req: any, res: any) {
return [
  "[RES]",
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  JSON.stringify(req.body),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' ')
};

const prod = morgan(formatMaker, {
  skip: function (req, res) {
    const url = `${req.get('host')+req.originalUrl}`;
    return url.indexOf("/health") > -1;
  }
});

export { prod }
