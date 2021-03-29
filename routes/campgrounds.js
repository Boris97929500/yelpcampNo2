
const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const multer = require('multer');
const{storage} = require('../cloudinary');
const upload = multer({storage});

//const { campgroundSchema } = require('../schemas');
//const isLoggedIn = require('../middleware');
// const validateCampground = require('../middleware');
// const isAuthor = require('../middleware');
//const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateCampground , isAuthor} = require('../middleware');


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.route('/')
//     .get( catchAsync(campgrounds.index))
//     .post(  isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))



    // .post( upload.array('image'), (req, res)=>{
    //   console.log(req.body, req.files);
    //   res.send('it worked!!');
    // } )


//missing validateCampground when creating new campground!!
router.route('/')
    .get( catchAsync(campgrounds.index))
    .post(  isLoggedIn, upload.array('image'), catchAsync(campgrounds.createCampground))



router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .get(catchAsync(campgrounds.showCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor,catchAsync(campgrounds.renderEditForm))
















//router.get('/new', isLoggedIn, campgrounds.renderNewForm)
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
// router.get('/:id', catchAsync(campgrounds.showCampground))
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;
