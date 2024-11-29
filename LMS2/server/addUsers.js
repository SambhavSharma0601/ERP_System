// addUsers.js
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/lmsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', async () => {
  try {
    await User.create([
      { email: 'samarth1248.be21@chitkara.edu.in', role: 'student' },
      { email: 'teacher1@example.com', role: 'teacher' },
    ]);
    console.log('Users inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting users:', error);
    process.exit(1);
  }
});
