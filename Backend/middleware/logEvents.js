module.exports.logEvents = (req) => {
  console.log(`${req.method} ${req.headers.origin} ${req.path} ${req.url}`);
};
