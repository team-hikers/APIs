import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUser = {
    id: new Date().getSeconds(),
    username: 'asdf',
    password: 'asdf',
    todos: [],
  };
  const users = [mockUser];

  const mockAuthService = {
    signIn: jest.fn((user) => {
      const { username, password } = user;
      const foundUser = users.find(
        (ele) => ele.username === username && ele.password === password,
      );
      if (foundUser) {
        return {
          user: { username: foundUser.username },
          token: '',
        };
      }
      return;
    }),
    validateUser: jest.fn((signInInput) => {
      const { username, password } = signInInput;
      const foundUser = users.find(
        (ele) => ele.username === username && ele.password === password,
      );
      return foundUser;
    }),
  };
  // { username, password }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should come with token', () => {
    const user = {
      id: new Date().getSeconds(),
      username: 'asdf',
      password: 'asdf',
      todos: [],
    };
    expect(authService.signIn(user)).toEqual({
      user: { username: user.username },
      token: expect.any(String),
    });
  });

  it('should get User ', () => {
    const signInInput = { username: 'asdf', password: 'asdf' };
    expect(authService.validateUser(signInInput)).toEqual(mockUser);
  });

  it('should not work when wrong input come', () => {
    const signInInput = { username: 'aaaa', password: 'aaaa' };
    expect(authService.validateUser(signInInput)).toBeUndefined();
  });
});
