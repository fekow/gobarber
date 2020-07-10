import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserControler';
import SessionController from './app/controllers/SessionController';
import FilesController from './app/controllers/FilesController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store); // só pode ter 1 store por restful, session fica em outro lugar.

routes.use(authMiddleware); // todo codigo apartir daqui vai precisa estar logado(com token) pra carregar

routes.put('/users', UserController.update); // posso usar só o middleware pra faze as funcoes

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FilesController.store);

export default routes;
