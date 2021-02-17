import { getRepository } from 'typeorm';
import { User } from '../models/User';

import { hash } from 'bcryptjs';

import { AppError } from '../errors/AppError';

interface IUser {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	public async execute({ name, email, password }: IUser): Promise<User> {
		const userRepository = getRepository(User);

		const userExists = await userRepository.findOne({
			where: { email },
		});

		if (userExists) {
			throw new AppError('Email address already used', 401);
		}

		const hashPassword = await hash(password, 10);

		const user = userRepository.create({
			name,
			email,
			password: hashPassword,
		});

		await userRepository.save(user);

		return user;
	}
}
