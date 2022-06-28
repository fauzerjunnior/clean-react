import React from 'react';
import { render, screen } from '@testing-library/react';
import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';
import { mockAccountModel } from '@/domain/test';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('SurveyResult component', () => {
  it('should present correct initial state', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: () => mockAccountModel()
        }}
      >
        <Router navigator={history} location={history.location}>
          <SurveyResult />
        </Router>
      </ApiContext.Provider>
    );

    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
