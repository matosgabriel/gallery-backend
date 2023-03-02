import { Request, Response } from 'express';
import { CreateFileService } from '../services/CreateFileService';

class FilesController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.body;

    const createFileService = new CreateFileService();

    await createFileService.execute();

    console.log(data);

    return response.json({ data });
  }
}

export { FilesController }