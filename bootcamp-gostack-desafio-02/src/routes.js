import { Router } from 'express';

// import User from './app/models/User';

// import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// POST - create session
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// POST - create student
routes.post('/students', StudentController.store);
// PUT - update student
routes.put('/students', StudentController.update);

export default routes;
