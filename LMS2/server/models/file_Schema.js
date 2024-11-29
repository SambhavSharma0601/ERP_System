// import mongoose from "mongoose";
const mongoose = require('mongoose');
const pdfDetailsSchema = new mongoose.Schema({
   user: String,
   name: String,
   file: String
});

// const PdfDetails = mongoose.model('PdfDetails', pdfDetailsSchema);
module.exports =  mongoose.model('PdfDetails', pdfDetailsSchema);
// export default PdfDetails;
