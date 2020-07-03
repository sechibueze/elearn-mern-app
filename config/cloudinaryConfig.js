const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUploader = cloudinary.v2.uploader;
const updateCloudinaryMediaContent = async (publicId, data, opts = {}) => {
  // console.log('passed to update cloudinary')
  // console.log('public ID', publicId)
  // // console.log('data', data)
  // console.log('opts', opts)
  try {
    const result = await cloudinaryUploader.upload(data, { public_id: publicId });
    
    return result;
  } catch (err) {
    throw err;
  }
};
module.exports = { cloudinaryUploader, updateCloudinaryMediaContent }