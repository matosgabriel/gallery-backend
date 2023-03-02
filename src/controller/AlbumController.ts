import { Album } from '@prisma/client';
import { Request, Response } from "express";

import { CreateAlbumService } from '../services/CreateAlbumService';

class AlbumController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const { name: albumName } = request.body;

    const createAlbumService = new CreateAlbumService();

    const { name, created_at, updated_at } = await createAlbumService.execute(albumName);

    return response.json({ name, created_at, updated_at });
  }
}

export { AlbumController }