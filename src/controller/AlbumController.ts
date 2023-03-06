import { Request, Response } from "express";

import { CreateAlbumService } from '../services/CreateAlbumService';
import { ListAlbumService } from '../services/ListAlbumService';
import { DeleteAlbumService } from '../services/DeleteAlbumService';
import { AppError } from "../error/AppError";

class AlbumController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const { name: albumName } = request.body;

    const createAlbumService = new CreateAlbumService();

    await createAlbumService.execute(albumName);

    return response.status(201).send();
  }

  public async list(request: Request, response: Response): Promise<Response | void> {
    const listAlbumService = new ListAlbumService();

    const albums = await listAlbumService.execute();

    return response.json({ albums });
  }

  public async delete(request: Request, response: Response): Promise<Response | void> {
    const query = request.query;
    const album_id = query.id;

    if (!album_id) throw new AppError('Album identificator not given.', 409);

    const deleteAlbumService = new DeleteAlbumService();
    await deleteAlbumService.execute(album_id.toString());

    return response.send();
  }
}

export { AlbumController }