const express=require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderUser)
    .post(catchAsync(users.registerUser))

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser)

router.get('/logout', users.logoutUser)

// router.get('/login', users.renderLoginForm)
// router.post('/register', catchAsync(users.registerUser))
// router.get('/register', users.renderUser)
// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser)


























module.exports = router;
