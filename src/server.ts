import 'dotenv/config';
import express from 'express';
import { appRoutes } from './routes';

const server = express();
server.use(express.json());

server.use(appRoutes);

server.listen(3333, () => console.log('Running at 3333! 🚀'));