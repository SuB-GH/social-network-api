const mongoose = require('mongoose'); // this allows Mongoose to connect when app is started



mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);