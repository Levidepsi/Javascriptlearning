
// @desc LOgs request to console

// logger Middleware
const logger = (req, res, next) => {
    // console.log(
    //     `${req.method} ${req.protocol}:// ${req.get('host')} ${req.originalUrl}`
    // );

    console.log(1);
      next();
  };

module.exports = logger;