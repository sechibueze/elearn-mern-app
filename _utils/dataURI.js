const DataURI = require('datauri/parser');
const path = require('path');
const dURI = new DataURI();

const getDataURI = req => {
  if (req.file) {
    const fileExtension = path.extname(req.file.originalname);
   return dURI.format(fileExtension, req.file.buffer).content;
  }else{
    return false;
  }
};

module.exports = { getDataURI };