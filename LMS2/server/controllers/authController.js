// controllers/authController.js
const User = require('../models/User');
const express = require('express');
const emailService = require('../services/emailService');
const jwt = require('jsonwebtoken');

const { getUserEmailFromToken } = require('../utils/auth');
const multer = require('multer');
const app = express();
const crypto = require('crypto');
const path = require('path');
const QuizQuestion = require('../models/QuizQuestion');

const File = require('../models/Files');
const Profile = require('../models/Profile');

exports.login = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();
    
    await emailService.sendOTP(email, otp);
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
   
  try {
     const user = await User.findOne({ email, otp });
     if (!user) return res.status(400).json({ error: 'Invalid OTP' });
     
     let redirectPath = '/';
     if (user.role === 'student') {
       redirectPath = '/homeStudent';
     } else if (user.role === 'teacher') {
       redirectPath = '/homeTeacher';
     }
     
     // Use process.env.JWT_SECRET instead of the hardcoded 'secret_key'
     const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
     
     res.status(200).json({ token, redirectPath });
  } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
  }
 };
 




const storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, 'uploads/');
 },
 filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
 },
});

const upload = multer({ storage: storage });

exports.uploadFile = upload.single('file');

exports.createFile = async (req, res) => {
  try {
     const email = req.body.email; // Assuming Bearer token
     console.log(email);
    //  const email = getUserEmailFromToken(token);
     if (!email) return res.status(401).send('Unauthorized');
 
     const user = await User.findOne({ email });
     if (!user) return res.status(400).send('User not found');
 
     const file = new File({
       title: req.body.title,
       type: req.body.type,
       file: req.file.path,
       uploadedBy: user._id,
     });
 
     await file.save();
     res.send(file);
  } catch (error) {
     res.status(500).send(error);
  }
 };
exports.getFilesByType = async (req, res) => {
  try {
     const files = await File.find({ type: req.params.type });
     res.json(files);
  } catch (error) {
     console.error(error);
     res.status(500).send('Server error');
  }
 };
 

 exports.downloadFile = (req, res) => {
  console.log("downloadFile function called");
  console.log("Filename:", req.params.filename);
  const filePath = path.join(__dirname, '../uploads/', req.params.filename);
  console.log("File path:", filePath);
  res.sendFile(filePath, (err) => {
     if (err) {
       console.error("Error sending file:", err);
       res.status(500).send("Error sending file");
     }
  });
 };

 exports.createQuiz =  (req, res) => {
   try {
     const { title, description, questions } = req.body;
     console.log("Received quiz data:", { title, description, questions });
 
    
     const newQuiz = new QuizQuestion({
       title,
       description,
       questions,
     });
 
     const savedQuiz =  newQuiz.save();
     console.log("Quiz saved successfully:", savedQuiz);
     res.status(201).json(savedQuiz);
   } catch (err) {
     console.error("Error saving quiz:", err);
     res.status(500).json({ error: "Internal Server Error" });
   }
 };
exports.createUser = async (req, res) => {
   try {
      const profile = new Profile(req.body);
      await profile.save();
      res.status(201).json(profile);
   } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
   }
  };
 
  exports.getUserById = async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      res.json(profile);
   } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
   }
  };
  
  exports.updateUserById= async (req, res) => {
   try {
      const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      res.json(profile);
   } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
   }
  };

  exports.createOrUpdateProfile = async (req, res) => {
   const { userId, ...profileData } = req.body;
   try {
      let profile = await Profile.findOne({ userId });
      if (!profile) {
        profile = new Profile({ userId, ...profileData });
      } else {
        Object.assign(profile, profileData);
      }
      await profile.save();
      res.status(200).json(profile);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
  };

  // authController.js
// authController.js
exports.updateProfile = async (req, res) => {
   const { name, rollNumber, group, branch, session, parentsName, address, bloodGroup } = req.body;
   // const email = req.user.email; // Assuming the user's email is extracted from the token
   
   try {
     const profile = await Profile.findOneAndUpdate(
      //  { email },
       { name, rollNumber, group, branch, session, parentsName, address, bloodGroup },
       { new: true, upsert: true }
     );
 
     res.status(200).json({ message: 'Profile updated successfully', profile });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal server error' });
   }
 };
 