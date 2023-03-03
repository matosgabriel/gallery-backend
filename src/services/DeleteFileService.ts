import { AppError } from '../error/AppError';
import { prismaClient } from '../prisma';
import { S3Storage } from '../utils/S3Storage';

class DeleteFileService {
  public async execute(file_id: string): Promise<void> {
    const s3Storage = new S3Storage();

    const file = await prismaClient.file.findUnique({ where: { id: file_id } });

    if (!file) throw new AppError('Does not exists a file with this identificator.');

    await s3Storage.deleteFile(file.name); // Delete from AWS S3

    // Delete all albumFile with file_id equal to the file who will be delete
    await prismaClient.albumFile.deleteMany({ where: { file_id } });

    await prismaClient.file.delete({ where: { id: file_id } }); // Delete file register
  }
}

export { DeleteFileService }