import { HttpPostParams } from '@/data/protocols/http';
import faker from '@faker-js/faker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word()
});
