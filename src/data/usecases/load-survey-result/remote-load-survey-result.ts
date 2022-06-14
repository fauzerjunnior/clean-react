import { LoadSurveyResult } from '@/domain/usecases';
import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError, AccessDeniedError } from '@/domain/errors';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveyResult = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        // eslint-disable-next-line prefer-object-spread
        return Object.assign({}, remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date)
        });

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    date: string;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
    }>;
  };
}
