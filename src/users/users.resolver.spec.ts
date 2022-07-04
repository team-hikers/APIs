import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockUsersResolver = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver],
    })
      .overrideProvider(UsersResolver)
      .useValue(mockUsersResolver)
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
