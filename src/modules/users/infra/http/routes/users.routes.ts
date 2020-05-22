import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersControllers = new UsersController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

// SoC - Separator of concerns - Separação de responsabilidades
// Rota: receber a requisição, chamar outro arquivo, devolver uma resposta

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
