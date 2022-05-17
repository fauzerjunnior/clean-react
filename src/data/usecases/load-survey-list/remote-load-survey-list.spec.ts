/* eslint-disable max-classes-per-file */
import { HttpGetClientSpy } from '@/data/test';
import faker from '@faker-js/faker';
import { RemoveLoadSurveyList } from './remote-load-survey-list';

describe('RemoveLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();

    const sut = new RemoveLoadSurveyList(url, httpGetClientSpy);
    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
