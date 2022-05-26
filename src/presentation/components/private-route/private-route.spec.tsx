import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { mockAccountModel } from '@/domain/test';
import { ApiContext } from '@/presentation/context';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyList } from '@/domain/usecases';
import PrivateRoute from './private-route';

type SutTypes = {
  history: MemoryHistory;
};

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount += 1;

    return [];
  }
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const loadSurveyListSpy = new LoadSurveyListSpy();

  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router navigator={history} location={history.location}>
        <PrivateRoute>
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </PrivateRoute>
      </Router>
    </ApiContext.Provider>
  );

  return { history };
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);

    expect(history.location.pathname).toBe('/login');
  });

  test('should render current component if token is not empty', () => {
    const { history } = makeSut();

    expect(history.location.pathname).toBe('/');
  });
});
