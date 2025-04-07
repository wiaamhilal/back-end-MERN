// const path = require("path");
// const multer = require("multer");

// // photo storage
// const photoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images"));
//   },
//   filename: function (req, file, cb) {
//     if (file) {
//       cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//     } else {
//       cb(null, false);
//     }
//   },
// });

// // photo upload middleware
// const photoUpload = multer({
//   storage: photoStorage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb({ message: "Unsupported file it shuold be an image" });
//     }
//   },
//   limits: { fieldSize: 1024 * 1024 * 1 }, //1 megabyte
// });
// module.exports = photoUpload;

// const path = require("path");
// const multer = require("multer");

// // تخزين الصور
// const photoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../images"));
//   },
//   filename: function (req, file, cb) {
//     if (file) {
//       cb(
//         null,
//         new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//       );
//     } else {
//       cb(new Error("File not provided"), false);
//     }
//   },
// });

// // إعداد `multer`
// const photoUpload = multer({
//   storage: photoStorage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(null, false); // لا تُرجع كائن خطأ هنا
//     }
//   },
//   limits: { fileSize: 1024 * 1024 * 5 }, // زيادة الحد إلى 5 ميغابايت
// });

// module.exports = photoUpload;

const path = require("path");
const multer = require("multer");

// إعداد التخزين
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, Date.now() + "-" + file.originalname);
    } else {
      cb(new Error("File not provided"), false);
    }
  },
});

// إعداد `multer` لقبول الصور فقط
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format. Please upload an image."), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB كحد أقصى
});

module.exports = photoUpload;
