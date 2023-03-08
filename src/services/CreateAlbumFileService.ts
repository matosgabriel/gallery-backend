import { AlbumFile } from '@prisma/client';
import { AppError } from '../error/AppError';
import { prismaClient } from '../prisma';

interface CreateAlbumFileServiceData {
  fileId: string;
  albumId: string;
}

class CreateAlbumFileService {
  public async execute({ albumId, fileId }: CreateAlbumFileServiceData): Promise<AlbumFile> {
    const album = await prismaClient.album.findUnique({ where: { id: albumId } });
    const file = await prismaClient.file.findUnique({ where: { id: fileId } });

    if (!album) throw new AppError("Does not exists a album with this identificador.", 404);
    if (!file) throw new AppError("Does not exists a file with this identificador.", 404);

    const albumFileExists = await prismaClient.albumFile.findFirst({ where: { albumId, fileId } })

    if (albumFileExists) throw new AppError("Already exists a AlbumFile with those album id and file id.", 400);

    const newAlbumFile = await prismaClient.albumFile.create({ data: { albumId, fileId } });

    return newAlbumFile;
  }
}

export { CreateAlbumFileService }