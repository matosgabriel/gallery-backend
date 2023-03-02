import { File } from '@prisma/client';
import { prismaClient } from '../prisma';
import { S3Storage } from '../utils/S3Storage';

interface CreateFileServiceData {
  filename: string;
}

class CreateFileService {
  public async execute({ filename }: CreateFileServiceData): Promise<File> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(filename);

    const newFile = await prismaClient.file.create({
      data: { name: filename, url: 'url_test' }
    });

    return newFile;
  }
}

export { CreateFileService }