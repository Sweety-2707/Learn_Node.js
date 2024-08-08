const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    console.log("Middleware 2");
    fs.appendFile(
      filename,
      `${Date.now()}:${req.path}:${req.method}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {
    logReqRes,
}
