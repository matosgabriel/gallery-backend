import { Router } from 'express';
import { filesRouter } from './file.routes';
import { albumRoutes } from './album.routes';
import { albumFileRoutes } from './albumFile.routes';

const appRoutes = Router();

appRoutes.use('/file', filesRouter);
appRoutes.use('/album', albumRoutes);
appRoutes.use('/albumFile', albumFileRoutes);

export { appRoutes }