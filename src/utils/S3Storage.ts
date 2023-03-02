import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import { multerConfig } from '../config/multer';

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
      throw new Error('File not found');
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
      throw new Error('Failed to upload the file.');
    }

    await fs.promises.unlink(originalPath);
  }
}

export { S3Storage }