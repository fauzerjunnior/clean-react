import { Footer, Header, Loading } from '@/presentation/components';
import React from 'react';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
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

        {false && <Loading />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
