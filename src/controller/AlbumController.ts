import { Request, Response } from "express";

import { CreateAlbumService } from '../services/CreateAlbumService';
import { ListAlbumService } from '../services/ListAlbumService';

class AlbumController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const { name: albumName } = request.body;

    const createAlbumService = new CreateAlbumService();

    const newAlbum = await createAlbumService.execute(albumName);

    return response.json(newAlbum);
  }

  public async list(request: Request, response: Response): Promise<Response | void> {
    const listAlbumService = new ListAlbumService();

    const albumList = await listAlbumService.execute();

    return response.json(albumList);
  }
}

export { AlbumController }