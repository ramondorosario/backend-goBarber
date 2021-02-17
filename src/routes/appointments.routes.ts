import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/appointments', async (request, response) => {
	const appointmentRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentRepository.find();

	return response.json(appointments);
});

appointmentRouter.post('/appointments', async (request, response) => {
	const { provider_id, date } = request.body;
	const parseDate = parseISO(date);
	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: parseDate,
	});

	return response.status(201).json(appointment);
});
