import { Request, Response } from 'express';
import { CreateFileService } from '../services/CreateFileService';

class FilesController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.file;

    const createFileService = new CreateFileService();

    if (data)
      await createFileService.execute({ filename: data.filename });
    else
      throw new Error('Missing file.');

    return response.json({ data });
  }
}

export { FilesController }