const path = require('path');
const multer = require('multer');

const PUBLIC_IMAGES = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_IMAGES);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports.imageUpload = upload.array('images');
