import { Router } from 'express';
import { filesRouter } from './files.routes';
import { albumRoutes } from './albums.routes';
import { albumFileRoutes } from './albumFiles.routes';

const appRoutes = Router();

appRoutes.use('/files', filesRouter);
appRoutes.use('/albums', albumRoutes);
appRoutes.use('/albumFiles', albumFileRoutes);

export { appRoutes }