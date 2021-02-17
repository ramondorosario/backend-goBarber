import { Repository, EntityRepository } from 'typeorm';
import { Appointment } from '../models/Appointment';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppontment = await this.findOne({
			where: { date },
		});

		return findAppontment || null;
	}
}
