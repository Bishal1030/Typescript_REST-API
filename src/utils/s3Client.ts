
// s3Client.ts
import { S3Client } from '@aws-sdk/client-s3';
import {AWS_REGION,AWS_SECRET_KEY,AWS_ACCESS_KEY} from '../secrets'

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY || 'your-access-key',
    secretAccessKey: AWS_SECRET_KEY || 'your-secret-key',
  },
});