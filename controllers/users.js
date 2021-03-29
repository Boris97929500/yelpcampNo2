const express=require('express');
const router = express.Router();
const passport = require('passport');
//const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


module.exports.renderUser = (req, res)=>{
  res.render('users/register');
};

module.exports.renderLoginForm = (req, res)=>{
  res.render('users/login');
};

module.exports.registerUser = async(req, res)=>{
  //res.send(req.body)
  try{
    const {username, email, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err=>{
      if(err) return next(err);

      req.flash('success', `Welcome to Yelp Camp, ${username}!`)
      res.redirect('/campgrounds');
    });
  }catch(e){
    req.flash('error', e.message);
    res.redirect('/register')
  }
    //console.log(registeredUser);
};

module.exports.loginUser = (req, res)=>{
  req.flash('success', 'welcome back!');
  const redirectUlr = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUlr);
};

module.exports.logoutUser = (req, res)=>{
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
};

















//edit end of code
