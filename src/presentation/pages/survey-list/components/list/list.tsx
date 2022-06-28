import React from 'react';
import {
  SurveyItem,
  SurveyItemEmpty
} from '@/presentation/pages/survey-list/components';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';
import Styles from './list-styles.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey: SurveyModel) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
