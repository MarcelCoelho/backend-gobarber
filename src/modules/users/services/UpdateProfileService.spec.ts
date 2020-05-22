import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Tre',
      email: 'jonhtre@example.com',
    });

    expect(updatedUser.name).toBe('Jonh Tre');
    expect(updatedUser.email).toBe('jonhtre@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'no-existing-user-id',
        name: 'teste1',
        email: 'teste1@teste1.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste1.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste2',
      email: 'teste2@teste2.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste3',
        email: 'teste1@teste1.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste1.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@teste2.com',
        old_password: '123123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste1.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@teste2.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste1.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@teste2.com',
        old_password: '123456',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
