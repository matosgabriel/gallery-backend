import { Router } from 'express';
import { filesRouter } from './files.routes';

const appRoutes = Router();

appRoutes.use('/files', filesRouter);

export { appRoutes }