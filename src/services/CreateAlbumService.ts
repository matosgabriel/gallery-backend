import { Album } from '@prisma/client';
import { prismaClient } from '../prisma';

class CreateAlbumService {
  public async execute(name: string): Promise<Album> {
    const newAlbum = await prismaClient.album.create({ data: { name } });

    return newAlbum;
  }
}

export { CreateAlbumService }