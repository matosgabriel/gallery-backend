import { Album } from '@prisma/client';
import { prismaClient } from '../prisma';

class ListAlbumService {
  public async execute(): Promise<Album[]> {
    const albumList = await prismaClient.album.findMany({
      include: { AlbumFile: true }
    });

    return albumList;
  }
}

export { ListAlbumService }