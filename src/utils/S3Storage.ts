import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import { multerConfig } from '../config/multer';
import { AppError } from '../error/AppError';

class S3Storage {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new AppError('File not found.', 404);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    try {
      await this.client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET || 'matosgabriel-gallery',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      }));
    } catch (err) {
      throw new AppError('Failed to upload the file.', 500);
    }

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      await this.client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET || 'matosgabriel-gallery',
        Key: filename,
      }));
    } catch (err) {
      throw new AppError('Failed to delete the file.', 500);
    }
  }
}

export { S3Storage }