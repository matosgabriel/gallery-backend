import { AlbumFile } from '@prisma/client';
import { prismaClient } from '../prisma';

interface CreateAlbumFileServiceData {
  file_id: string;
  album_id: string;
}

class CreateAlbumFileService {
  public async execute({ album_id, file_id }: CreateAlbumFileServiceData): Promise<AlbumFile> {
    const newAlbumFile = await prismaClient.albumFile.create({ data: { album_id, file_id } });

    return newAlbumFile;
  }
}

export { CreateAlbumFileService }