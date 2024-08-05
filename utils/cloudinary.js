const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//cloudinary upload image
const cloudinaryUploadImage = async (myImage) => {
  try {
    const data = await cloudinary.uploader.upload(myImage, {
      resourse_type: "auto",
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error (coudinary)");
  }
};

//cloudinary remove image
const cloudinaryReoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error (coudinary)");
  }
};

//cloudinary remove multiple image
const cloudinaryReoveMultipleImage = async (publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_all_resources(publicIds);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("internal server error (coudinary)");
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryReoveImage,
  cloudinaryReoveMultipleImage,
};
