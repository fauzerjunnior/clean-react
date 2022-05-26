import React from 'react';
import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import { Helper, ValidationStub } from '@/presentation/test';
import faker from '@faker-js/faker';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';
import { Authentication } from '@/domain/usecases';
import { AuthenticationSpy } from '@/domain/test';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: Authentication.Model) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();

  validationStub.errorMessage = params?.validationError;
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    authenticationSpy,
    setCurrentAccountMock
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login component', () => {
  it('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
  });

  it('should start with submit button disabled', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');

    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
  });

  it('should show valid email state if validation succeds', () => {
    makeSut();

    Helper.populateField('email');
    Helper.testStatusForField('email');
  });

  it('should show valid password state if validation succeds', () => {
    makeSut();

    Helper.populateField('password');
    Helper.testStatusForField('password');
  });

  it('should enable submit button if form is valid', async () => {
    makeSut();

    await simulateValidSubmit();
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  it('should load spinner on submit', async () => {
    makeSut();

    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  it('should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  it('should call authentication only once', async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);

    await simulateValidSubmit();
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  });

  test('should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    );

    expect(history.location.pathname).toBe('/');
  });

  test('should go to signup page', async () => {
    makeSut();
    const register = screen.getByTestId('signup-link');

    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
  });
});
