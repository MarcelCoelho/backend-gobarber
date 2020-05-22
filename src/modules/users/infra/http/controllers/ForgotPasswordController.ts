import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmalService from '@modules/users/services/SendForgotPasswordEmailService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmalService = container.resolve(
      SendForgotPasswordEmalService,
    );

    await sendForgotPasswordEmalService.execute({
      email,
    });

    return response.status(204).json();
  }
}
