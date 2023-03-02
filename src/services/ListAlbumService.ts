import { Album } from '@prisma/client';
import { prismaClient } from '../prisma';

class ListAlbumService {
  public async execute(): Promise<Album[]> {
    const albumList = await prismaClient.album.findMany();

    return albumList;
  }
}

export { ListAlbumService }