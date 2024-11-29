const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lmsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

