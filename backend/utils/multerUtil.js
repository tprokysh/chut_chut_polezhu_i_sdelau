const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/files",
  filename: (req, file, cb) => {
    cb(null, "films" + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single("file");

module.exports = upload;
