import { Request, Response } from "express";

import { CreateAlbumFileService } from '../services/CreateAlbumFileService';

class AlbumFileController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const { file_id, album_id } = request.body;

    const createAlbumService = new CreateAlbumFileService();

    await createAlbumService.execute({ file_id, album_id });

    return response.status(201).send();
  }
}

export { AlbumFileController }