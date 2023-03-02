import { Router } from 'express';
import { filesRouter } from './file.routes';
import { albumRoutes } from './album.routes';

const appRoutes = Router();

appRoutes.use('/file', filesRouter);
appRoutes.use('/album', albumRoutes);

export { appRoutes }