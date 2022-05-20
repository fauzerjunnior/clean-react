import React from 'react';
import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/test';
import faker from '@faker-js/faker';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
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

const testElementExists = (fieldname: string): void => {
  const element = screen.getByTestId(fieldname);
  expect(element).toBeTruthy();
};

describe('Login component', () => {
  afterEach(cleanup);

  it('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisabled('submit', true);
  });

  it('should start with submit button disabled', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');

    Helper.testButtonIsDisabled('submit', true);
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
    Helper.testButtonIsDisabled('submit', false);
  });

  it('should load spinner on submit', async () => {
    makeSut();

    await simulateValidSubmit();
    testElementExists('spinner');
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
    Helper.testElementText('main-error', error.message);
    Helper.testChildCount('error-wrap', 1);
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
