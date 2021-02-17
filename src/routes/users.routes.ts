import { Router } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatar } from '../services/UpdateUserAvatarService';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { uploadConfig } from '../config/upload';
import multer from 'multer';

import { AppError } from '../errors/AppError';

export const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/users', async (request, response) => {
	const { name = null, email = null, password = null } = request.body;
	const createUser = new CreateUserService();

	if (!name || !email || !password) {
		throw new AppError('All fields must be filled');
	}

	const user = await createUser.execute({
		name,
		email,
		password,
	});

	return response.json(user);
});

usersRouter.patch(
	'/users/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = new UpdateUserAvatar();

		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		});

		const { password, ...data } = user;

		return response.status(201).json(data);
	},
);
