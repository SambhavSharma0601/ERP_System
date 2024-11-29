const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
// const multer = require('multer');
// const File = require('../models/Files');
// const path = require('path');
// const path2 = require('.');



router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);

router.post('/upload-file', authController.uploadFile, authController.createFile);
// router.get("/get-files", authController.createFile);
router.get('/get-files/:type', authController.getFilesByType);
// router.get("/download-file/:filename", authController.downloadFile);
// routes/authRoutes.js
router.get('/download-file/:filename', authController.downloadFile);
router.post('/quiz',authController.createQuiz);



router.post('/profile', authController.createOrUpdateProfile);


router.post('/create-user', authController.createUser);

router.get('/user/:id', authController.getUserById);
router.put('/user/:id', authController.updateUserById);

router.put('/update-profile',
authController.updateProfile);



module.exports = router;
