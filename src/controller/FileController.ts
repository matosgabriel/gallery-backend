import { File } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateFileService } from '../services/CreateFileService';

class FileController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.file;

    const createFileService = new CreateFileService();

    let newFile: File;

    if (data)
      newFile = await createFileService.execute({ filename: data.filename });
    else
      throw new Error('Missing file.');

    return response.json(newFile);
  }
}

export { FileController }