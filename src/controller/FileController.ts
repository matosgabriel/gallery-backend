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
    const newFile = await createFileService.execute(data.filename);

    return response.json(newFile);
  }

  public async delete(request: Request, response: Response): Promise<Response | void> {
    const query = request.query;
    const file_id = query.file_id;

    if (!file_id) throw new AppError('Identificator not provided.', 409);

    const deleteFileService = new DeleteFileService();
    await deleteFileService.execute(file_id.toString());

    return response.json({ message: 'File successfully deleted.' });
  }
}

export { FileController }