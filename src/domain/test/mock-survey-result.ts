import faker from '@faker-js/faker';
import { LoadSurveyResult } from '@/domain/usecases';

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    },
    {
      answer: faker.random.words(),
      count: faker.datatype.number(),
      percent: faker.datatype.number(100),
      isCurrentAccountAnswer: faker.datatype.boolean()
    }
  ]
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount += 1;
    return this.surveyResult;
  }
}
