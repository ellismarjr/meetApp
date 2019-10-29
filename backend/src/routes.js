import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';
import NotificationController from './app/controllers/NotificationController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/meetups', upload.single('file'), MeetupController.store);
routes.put(
  '/meetups/:meetupId',
  upload.single('file'),
  MeetupController.update
);
routes.get('/meetups', MeetupController.index);
routes.delete('/meetups/:meetupId', MeetupController.delete);

routes.post('/meetups/subscriptions/:meetupId', SubscriptionController.store);

routes.get('/subscriptions', SubscriptionController.index);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
