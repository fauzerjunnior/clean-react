import { RemoteLoadSurveyResult } from '@/data/usecases';
import faker from '@faker-js/faker';

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.random.words(),
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
    ],
    date: faker.date.recent().toISOString()
  });
