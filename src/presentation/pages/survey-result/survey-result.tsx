/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  });

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar className={Styles.calendarWrap} date={new Date()} />
              <h2>Qual é seu framework web favorito?</h2>
            </hgroup>
            <ul className={Styles.answersList}>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-react.png"
                  alt="React"
                />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-vue.png"
                  alt="Vue"
                />
                <span className={Styles.answer}>VueJS</span>
                <span className={Styles.percent}>30%</span>
              </li>
              <li>
                <img
                  src="http://fordevs.herokuapp.com/static/img/logo-angular.png"
                  alt="React"
                />
                <span className={Styles.answer}>Angular</span>
                <span className={Styles.percent}>20%</span>
              </li>
            </ul>

            <button type="button">Voltar</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
