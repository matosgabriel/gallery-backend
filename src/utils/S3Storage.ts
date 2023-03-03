import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import { multerConfig } from '../config/multer';
import { AppError } from '../error/AppError';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
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
      await this.client.putObject({
        Bucket: process.env.AWS_BUCKET || 'matosgabriel-gallery',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      }).promise();
    } catch (err) {
      throw new AppError('Failed to upload the file.', 500);
    }

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      await this.client.deleteObject({
        Bucket: process.env.AWS_BUCKET || 'matosgabriel-gallery',
        Key: filename,
      }).promise();
    } catch (err) {
      throw new AppError('Failed to delete the file.', 500);
    }
  }
}

export { S3Storage }