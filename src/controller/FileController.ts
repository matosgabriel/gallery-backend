import { File } from '@prisma/client';
import { Request, Response } from 'express';
import { AppError } from '../error/AppError';

import { CreateFileService } from '../services/CreateFileService';
import { DeleteFileService } from '../services/DeleteFileService';

class FileController {
  public async create(request: Request, response: Response): Promise<Response | void> {
    const data = request.file;

    if (!data) throw new AppError('Missing file.', 409); // Ensure file was given

    const createFileService = new CreateFileService();
    await createFileService.execute(data.filename);

    return response.status(201).send();
  }

  public async delete(request: Request, response: Response): Promise<Response | void> {
    const query = request.query;
    const fileId = query.id;

    if (!fileId) throw new AppError('Identificator not provided.', 409); // Ensure fileId was given

    const deleteFileService = new DeleteFileService();
    await deleteFileService.execute(fileId.toString());

    return response.send();
  }
}

export { FileController }