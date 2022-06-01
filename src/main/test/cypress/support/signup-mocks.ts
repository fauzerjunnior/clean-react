import faker from '@faker-js/faker';
import * as Http from './http-mocks';

export const mockEmailInUseError = (): void =>
  Http.mockServerError(/signup/, 'POST');

export const mockUnexpectedError = (): void =>
  Http.mockForbiddenError(/signup/, 'POST');

export const mockOk = (): void =>
  Http.mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });
