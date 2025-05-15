// uploadToS3.ts
import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import {AWS_ACCESS_KEY,AWS_SECRET_KEY,AWS_REGION,AWS_BUCKET_NAME} from '../secrets'
import {s3Client} from '../utils/s3Client'




export const uploadToS3FromDisk = async (filePath: string, fileName: string, mimetype: string): Promise<string> => {
  const fileStream = fs.createReadStream(filePath);

  const key = `profile_images/${Date.now()}-${fileName}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: fileStream,
    ContentType: mimetype,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  // Optional: Delete the local file after uploading
  fs.unlinkSync(filePath);

  return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};
