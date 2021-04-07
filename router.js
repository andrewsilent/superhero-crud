const { Router } = require('express');
const multer = require('multer');
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage });

// router.post('/');

module.exports = router