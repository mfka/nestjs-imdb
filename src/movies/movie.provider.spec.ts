import { Test, TestingModule } from '@nestjs/testing';

import { MovieProvider } from './movie.provider';

describe('MovieProvider', () => {
  let provider: MovieProvider;

  const mockMovieRepository = {
    getAllSortedQuery: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieProvider,
        {
          provide: 'MovieRepository',
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    provider = module.get<MovieProvider>(MovieProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
