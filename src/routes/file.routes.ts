import { Router } from 'express';
import multer from 'multer';

import { FileController } from '../controller/FileController';
import { multerConfig } from '../config/multer';

const fileController = new FileController();

const filesRouter = Router();

const upload = multer(multerConfig);

filesRouter.post('/', upload.single('file'), fileController.create);
filesRouter.delete('/', fileController.delete);

export { filesRouter }