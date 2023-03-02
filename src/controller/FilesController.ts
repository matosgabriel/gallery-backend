import { File } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateFileService } from '../services/CreateFileService';

class FilesController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.file;

    const createFileService = new CreateFileService();

    let newFile: File;

    if (data)
      newFile = await createFileService.execute({ originalName: data.originalname, filename: data.filename });
    else
      throw new Error('Missing file.');

    const { name, url, created_at, updated_at } = newFile;
    return response.json({ name, url, created_at, updated_at });
  }
}

export { FilesController }