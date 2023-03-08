import { AppError } from '../error/AppError';
import { prismaClient } from '../prisma';
import { S3Storage } from '../utils/S3Storage';

class DeleteFileService {
  public async execute(fileId: string): Promise<void> {
    const s3Storage = new S3Storage();

    const file = await prismaClient.file.findUnique({ where: { id: fileId } });

    if (!file) throw new AppError('Does not exists a file with this identificator.');

    await s3Storage.deleteFile(file.name); // Delete from AWS S3

    // Delete all albumFile with fileId equal to the file who will be delete
    await prismaClient.albumFile.deleteMany({ where: { fileId } });

    await prismaClient.file.delete({ where: { id: fileId } }); // Delete file register
  }
}

export { DeleteFileService }