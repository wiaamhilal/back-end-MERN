const path = require("path");
const multer = require("multer");

// photo storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

// photo upload middleware
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file it shuold be an image" });
    }
  },
  limits: { fieldSize: 1024 * 1024 * 1 }, //1 megabyte
});

// const multer = require("multer");
// const path = require("path");

// const photoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images")); // المسار لتخزين الصور
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // اسم الصورة
//   },
// });

// const photoUpload = multer({
//   storage: photoStorage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Unsupported file type. Please upload an image."));
//     }
//   },
//   limits: { fileSize: 1024 * 1024 * 1 }, // الحد الأقصى لحجم الملف: 1 ميجابايت
// });

module.exports = photoUpload;
