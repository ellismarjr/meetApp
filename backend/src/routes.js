import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import SubscriptionController from './app/controllers/SubscriptionController';

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

routes.post('/meetups/register/:meetupId', SubscriptionController.store);

routes.get('/subscription', SubscriptionController.index);

export default routes;
