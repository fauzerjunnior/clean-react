import React, { useEffect, useState } from 'react';
import { Error, Footer, Header } from '@/presentation/components';
import {
  SurveyContext,
  SurveyListItem
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

  const reload = () =>
    setState((old) => ({ surveys: [], error: '', reload: !old.reload }));

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
          {state.error ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </div>
      </SurveyContext.Provider>
      <Footer />
    </div>
  );
};

export default SurveyList;
