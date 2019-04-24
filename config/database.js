//set up mongoose connection
const mongoose = require('mongoose');

let isDev = process.env.NODE_ENV !== 'production'

const mongoDB = isDev ? 'mongodb://localhost/NewsStudio' : 'mongodb://acadatrends:acadatrends1@ds161262.mlab.com:61262/acadatrend'
// const mongoDB =  'mongodb://acadatrends:acadatrends1@ds161262.mlab.com:61262/acadatrend' //for online db
// const mongoDB = "mongodb://localhost/NewsStudio"
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;
