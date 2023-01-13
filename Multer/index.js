const multer = require("multer");

var maxSize = 1 * 1000 * 1000 * 1000;
const FileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },

  fileFilter: function (req, file, cb) {
    
    cb(undefined, true);
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  },
});

const upload = multer({
  storage: FileStorageEngine,
});

module.exports = upload;
