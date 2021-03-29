const express = require('express');
//const router = express.Router({mergeParams: true});
//const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const { campgroundSchema } = require('../schemas')
const { reviewSchema } = require('../schemas.js');
//const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

module.exports.createReview = async (req, res)=>{
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Created New Review!');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res)=>{
  // res.send('delet me')
  const {id, reviewId} = req.params;
  await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully Deleted Review!')
  res.redirect(`/campgrounds/${id}`);
};




























//editing end of code
