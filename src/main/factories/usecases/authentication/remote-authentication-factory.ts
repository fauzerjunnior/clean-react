import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl();
  return new RemoteAuthentication(url, makeAxiosHttpClient());
};
