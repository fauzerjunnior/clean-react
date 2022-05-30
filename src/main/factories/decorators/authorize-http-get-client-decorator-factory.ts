import { makeAxiosHttpClient } from '@/main/factories/http';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';
import { HttpGetClient } from '@/data/protocols/http';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  );
};
