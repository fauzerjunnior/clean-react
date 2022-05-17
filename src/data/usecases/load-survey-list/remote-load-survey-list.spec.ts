/* eslint-disable max-classes-per-file */
import { HttpGetClientSpy } from '@/data/test';
import faker from '@faker-js/faker';
import { RemoveLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoveLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoveLoadSurveyList(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy
  };
};

describe('RemoveLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
