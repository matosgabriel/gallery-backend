import { Router } from 'express';

import { AlbumController } from '../controller/AlbumController';

const albumController = new AlbumController();

const albumRoutes = Router();

albumRoutes.post('/', albumController.create);

export { albumRoutes }