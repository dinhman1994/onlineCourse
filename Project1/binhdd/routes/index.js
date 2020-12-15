const express = require('express');
const authController = require('../controllers/auth/authController');
const authValidator = require('../validator/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { title: 'Login page', page: 1 });
});

router.get('/supervisor_login', (req, res, next) => {
  res.render('auth/login', { title: 'Supervisor Login page', page: 2 });
});

router.get('/admin_login', (req, res, next) => {
  res.render('auth/login', { title: 'Admin Login page', page: 3});
});

router.get('/register',(req,res,next) => {
	res.render('auth/register', {title: 'Register page', page: 1});
});

router.get('/supervisor_register',(req,res,next) => {
	res.render('auth/register', {title: 'Supervisor Register page', page: 2});
});

router.get('/admin_register',(req,res,next) => {
	res.render('auth/register', {title: 'Admin Register page', page: 3});
});

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

router.get('/logout',authController.logout);


router.post('/login', authValidator.postLogin, authController.login);
router.post('/register', authValidator.postRegister, authController.register);

router.post('/supervisor_login', authValidator.postLogin, authController.login);
router.post('/supervisor_register', authValidator.postRegister, authController.register);

router.post('/admin_login', authValidator.postLogin, authController.login);
router.post('/admin_register', authValidator.postRegister, authController.register);

module.exports = router;
