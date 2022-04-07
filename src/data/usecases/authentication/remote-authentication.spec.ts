import { HttpPostClientSpy } from '@/data/test';
import { mockAccountModel, mockAuthentication } from '@/domain/test';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';
import { AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import faker from '@faker-js/faker';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    // .toBe compare pointers of object
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    // .toEqual compare value of objects
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpPostAccount returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult);
  });
});
