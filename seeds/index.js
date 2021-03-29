const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const priceR = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            // MY OWN author ID
            author:'605a7e1ed6122473180f2c81',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/190727',
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis a',
            price: priceR,
            geometry: {
              type: 'Point',
              coordinates: [ 144.9631, -37.8136 ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/djbkwjmse/image/upload/v1616741512/YelpCamp/m5ulhl5gumj81pofmxwo.jpg',
                  filename: 'YelpCamp/m5ulhl5gumj81pofmxwo'
                },
                {
                  url: 'https://res.cloudinary.com/djbkwjmse/image/upload/v1616741514/YelpCamp/hrod12txiplsokol2fbt.jpg',
                  filename: 'YelpCamp/hrod12txiplsokol2fbt'
                }
                  ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
