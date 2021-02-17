import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

import { AppError } from '../errors/AppError';

interface IRequest {
	provider_id: string;
	date: Date;
}

export class CreateAppointmentService {
	public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
		const appointmentRepository = getCustomRepository(AppointmentsRepository);
		const appointmentDate = startOfHour(date);

		const fidAppointmentInSameDate = await appointmentRepository.findByDate(
			appointmentDate,
		);

		if (fidAppointmentInSameDate) {
			throw new AppError('This appointment is already booked', 401);
		}

		const appointment = appointmentRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentRepository.save(appointment);

		return appointment;
	}
}
