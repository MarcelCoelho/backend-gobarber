import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordEmalService from '@modules/users/services/ResetPasswordService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordEmalService = container.resolve(
      ResetPasswordEmalService,
    );

    await resetPasswordEmalService.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
