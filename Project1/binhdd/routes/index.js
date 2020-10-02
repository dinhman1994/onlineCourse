const express = require('express');
const authController = require('../controllers/auth/authController');
const authValidator = require('../validator/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { title: 'Login page' });
});

router.post('/login', authValidator.postLogin, authController.login);

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

module.exports = router;
