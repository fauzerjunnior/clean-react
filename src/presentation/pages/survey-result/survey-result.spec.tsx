import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const loadSurveyResultSpy = new LoadSurveyResultSpy();

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router navigator={history} location={history.location}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return { loadSurveyResultSpy };
};

describe('SurveyResult component', () => {
  it('should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');

    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  it('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();

    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });
});
