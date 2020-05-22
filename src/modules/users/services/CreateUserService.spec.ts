import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUserssRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserRepository: CreateUserService;

describe('CreateAppoinment', () => {
  beforeEach(() => {
    fakeUserssRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserRepository = new CreateUserService(
      fakeUserssRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUserRepository.execute({
      name: 'John Doe',
      email: 'john@hot.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    await createUserRepository.execute({
      name: 'John Doe',
      email: 'john@hot.com',
      password: '123456',
    });

    await expect(
      createUserRepository.execute({
        name: 'John Doe',
        email: 'john@hot.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
