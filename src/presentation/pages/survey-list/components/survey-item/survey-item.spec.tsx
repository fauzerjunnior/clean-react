import React from 'react';
import { mockSurveyModel } from '@/domain/test';
import { render, screen } from '@testing-library/react';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { IconName } from '@/presentation/components';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem', () => {
  test('should with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-07-10T00:00:00')
    });

    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jul');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });
});
