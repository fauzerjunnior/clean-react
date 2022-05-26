import { RemoteLoadSurveyList } from '@/data/usecases';
import { LoadSurveyList } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAxiosHttpClient()
  );
};
