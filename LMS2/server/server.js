const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv= require('dotenv').config();
const QuizQuestion = require('./models/QuizQuestion');
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
