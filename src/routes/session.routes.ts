import { Router } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export const sessionRouter = Router();

sessionRouter.post('/session', async (request, response) => {
	const { email, password } = request.body;
	const authenticateUser = new AuthenticateUserService();

	const { user, token } = await authenticateUser.execute({
		email,
		password,
	});

	const { password: Password, ...data } = user;

	return response.json({ data, token });
});
