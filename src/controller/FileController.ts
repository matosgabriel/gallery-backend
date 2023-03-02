import { File } from '@prisma/client';
import { Request, Response } from 'express';
import { AppError } from '../error/AppError';
import { CreateFileService } from '../services/CreateFileService';

class FileController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.file;

    if (!data) throw new AppError('Missing file.', 409); // Ensure file was given

    const createFileService = new CreateFileService();
    const newFile = await createFileService.execute({ filename: data.filename });

    return response.json(newFile);
  }
}

export { FileController }