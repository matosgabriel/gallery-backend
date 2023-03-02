import { S3Storage } from '../utils/S3Storage';

interface CreateFileServiceData {
  filename: string;
}

class CreateFileService {
  public async execute({ filename }: CreateFileServiceData): Promise<void> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(filename);
  }
}

export { CreateFileService }