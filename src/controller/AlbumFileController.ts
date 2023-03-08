import { Request, Response } from "express";

import { CreateAlbumFileService } from '../services/CreateAlbumFileService';

class AlbumFileController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const { fileId, albumId } = request.body;

    const createAlbumService = new CreateAlbumFileService();

    await createAlbumService.execute({ fileId, albumId });

    return response.status(201).send();
  }
}

export { AlbumFileController }