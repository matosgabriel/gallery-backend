import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { AppError } from './error/AppError';

import { appRoutes } from './routes';

const server = express();
server.use(express.json());
server.use(appRoutes);

server.use((error: Error, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.code).json({ status: 'error', message: error.message })
  }

  console.error(error);

  return response.status(500).json({ status: 'error', message: 'Internal server error.' });
});

server.listen(3333, () => console.log('Running at 3333! 🚀'));