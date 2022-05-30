import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('Header Component', () => {
  test('should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const setCurrentAccountMock = jest.fn();

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router navigator={history} location={history.location}>
          <Header />
        </Router>
      </ApiContext.Provider>
    );

    fireEvent.click(screen.getByTestId('logout'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
