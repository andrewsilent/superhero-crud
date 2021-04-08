const { Router } = require('express');
const multer = require('multer');
const SuperheroController = require('./controllers/superhero.controller');
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

router.post(
  '/superheroes',
  /*upload.array('image')*/ SuperheroController.createHero,
);
router.get('/superheroes');
router.get('/superheroes/:id');
router.patch('/superheroes/:id');
router.delete('/superheroes/:id', SuperheroController.deleteHero);

module.exports = router;
