import { Router } from 'express';

import { AlbumFileController } from '../controller/AlbumFileController';

const albumFileController = new AlbumFileController();

const albumFileRoutes = Router();

albumFileRoutes.post('/', albumFileController.create);

export { albumFileRoutes }