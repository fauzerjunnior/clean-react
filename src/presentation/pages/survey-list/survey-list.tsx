import React, { useEffect, useState } from 'react';
import { Footer, Header } from '@/presentation/components';
import {
  SurveyContext,
  SurveyListItem,
  Error
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { useErrorHandler } from '@/presentation/hooks';
import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  });

  const handleError = useErrorHandler((err: Error) => {
    setState((old) => ({ ...old, error: err.message }));
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch(handleError);
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <SurveyContext.Provider value={{ state, setState }}>
        <div className={Styles.contentWrap}>
          <h2>Enquetes</h2>
          {state.error ? <Error /> : <SurveyListItem />}
        </div>
      </SurveyContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyList;
