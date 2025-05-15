import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY_APIKEY, CLOUDINARY_APISECRET, CLOUDINARY_CLOUDNAME } from '../secrets';
import fs from 'fs'


// Configuration
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUDNAME, 
    api_key: CLOUDINARY_APIKEY, 
    api_secret: CLOUDINARY_APISECRET
});

// 2. Upload using file path
export const uploadToCloudinary = (filePath: string): Promise<string> => {
  return cloudinary.uploader.upload(filePath, {
    folder: 'profile_images',
  }).then((result) => {
    // Optional: clean up file after upload
    fs.unlinkSync(filePath);
    return result.secure_url;
  });
};






