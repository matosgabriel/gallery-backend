import { Router } from 'express';
import multer from 'multer';

import { FilesController } from '../controller/FilesController';
import { storage } from '../config/multer';

const filesController = new FilesController();

const filesRouter = Router();

const upload = multer({ storage });

filesRouter.post('/', upload.single('file'), filesController.create);

export { filesRouter }