import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calendar } from '@/presentation/components';

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />);
};

describe('SurveyItem', () => {
  test('should with correct values', () => {
    makeSut(new Date('2022-07-10T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jul');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });

  test('should with correct values', () => {
    makeSut(new Date('2018-03-03T00:00:00'));

    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('mar');
    expect(screen.getByTestId('year')).toHaveTextContent('2018');
  });
});
