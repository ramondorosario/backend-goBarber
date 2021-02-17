import { Router } from 'express';

import { appointmentRouter } from './appointments.routes';
import { usersRouter } from './users.routes';
import { sessionRouter } from './session.routes';

export const routes = Router();

routes.use(sessionRouter);
routes.use(usersRouter);
routes.use(appointmentRouter);
