import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import { multerConfig } from '../config/multer';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: 'matosgabriel-gallery',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(originalPath);
  }
}

export { S3Storage }