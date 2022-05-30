import React, { useContext, useEffect, useState } from 'react';
import { Footer, Header } from '@/presentation/components';
import {
  SurveyContext,
  SurveyListItem,
  Error
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { AccessDeniedError } from '@/domain/errors';
import Styles from './survey-list-styles.scss';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);

  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((err) => {
        if (err instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          navigate('/login', { replace: true });
        } else {
          setState({ ...state, error: err.message });
        }
      });
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
