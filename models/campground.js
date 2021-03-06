const mongoose = require('mongoose');
const Review = require('./reviews');
const Schema = mongoose.Schema;

//ObjectId: 605a7e1ed6122473180f2c81
const ImageSchema = new Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload', '/upload/w_200');
});
const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema ],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

CampgroundSchema.post('findOneAndDelete', async function(doc){
  //console.log('DELETED!!')
  //console.log(doc)
  if(doc){
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

//const Campground = mongoose.model(Campground, CampgroundSchema);
module.exports = mongoose.model('Campground', CampgroundSchema);
