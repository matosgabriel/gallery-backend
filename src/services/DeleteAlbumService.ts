import { AppError } from '../error/AppError';
import { prismaClient } from '../prisma';

class DeleteAlbumService {
  public async execute(albumId: string): Promise<void> {
    const album = await prismaClient.album.findUnique({ where: { id: albumId } });

    if (!album)
      throw new AppError('Does not exists an album with this identificator.', 404); // Ensure album exists

    await prismaClient.albumFile.deleteMany({ where: { albumId } }); // Delete album-files registers

    await prismaClient.album.delete({ where: { id: albumId } }); // Delete album register
  }
}

export { DeleteAlbumService }