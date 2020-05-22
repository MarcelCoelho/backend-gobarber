import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

// SoC - Separator of concerns - Separação de responsabilidades
// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
