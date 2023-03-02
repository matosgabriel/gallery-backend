import { File } from '@prisma/client';
import { prismaClient } from '../prisma';
import { S3Storage } from '../utils/S3Storage';

interface CreateFileServiceData {
  originalName: string;
  filename: string;
}

class CreateFileService {
  public async execute({ originalName, filename }: CreateFileServiceData): Promise<File> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(filename);

    const newFile = await prismaClient.file.create({
      data: { name: originalName.split('.')[0], url: 'url_test' }
    });

    console.log(`NEW FILE = ${newFile}`);
    return newFile;
  }
}

export { CreateFileService }