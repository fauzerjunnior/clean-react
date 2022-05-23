import { SurveyModel } from '@/domain/models';
import { Icon, IconName } from '@/presentation/components';
import * as Helper from '@/presentation/helper';
import React from 'react';
import Styles from './survey-item-styles.scss';

type Props = {
  survey: SurveyModel;
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {Helper.formatDay(survey.date)}
          </span>
          <span data-testid="month" className={Styles.month}>
            {Helper.formatMonth(survey.date)}
          </span>
          <span data-testid="year" className={Styles.year}>
            {Helper.formatYear(survey.date)}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  );
};

export default SurveyItem;
