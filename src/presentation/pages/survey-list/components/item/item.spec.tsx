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
      didAnswer: true
    });

    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('should with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    });

    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
