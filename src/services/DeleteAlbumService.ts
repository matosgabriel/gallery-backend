import { Album } from '@prisma/client';
import { AppError } from '../error/AppError';
import { prismaClient } from '../prisma';

class DeleteAlbumService {
  public async execute(album_id: string): Promise<void> {
    const album = await prismaClient.album.findUnique({ where: { id: album_id } });

    if (!album)
      throw new AppError('Does not exists an album with this identificator.', 404); // Ensure album exists

    await prismaClient.albumFile.deleteMany({ where: { album_id } }); // Delete album-files registers

    await prismaClient.album.delete({ where: { id: album_id } }); // Delete album register
  }
}

export { DeleteAlbumService }