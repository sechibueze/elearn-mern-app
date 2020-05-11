const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function uploadImage(filename, folder='node-images', allowedFormats = ['png', 'jpg']) {
  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: folder,
    allowedFormats: allowedFormats
    // transformation: [{ width: 250, height: 250, crop: "limit" }]
  });
  const parser = multer({ storage: storage });
  return parser.single(filename);
}

// function cloudinaryUploadImage(filePath, options, cb) {
//   cloudinary.v2.uploader.upload(filePath, options , cb())
// }

module.exports = { uploadImage };