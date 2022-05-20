import { InvalidCredentialsError } from '@/domain/errors';
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test';
import faker from '@faker-js/faker';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';
import { AccountModel } from '@/domain/models';
import SignUp from './signup';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    addAccountSpy,
    setCurrentAccountMock
  };
};

const simulateValidSubmit = async (
  name = faker.random.word(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('SignUp component', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisabled('submit', true);
    Helper.testStatusForField('name', validationError);
    Helper.testStatusForField('email', validationError);
    Helper.testStatusForField('password', validationError);
    Helper.testStatusForField('passwordConfirmation', validationError);
  });

  it('should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.populateField('name');
    Helper.testStatusForField('name', validationError);
  });

  it('should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.populateField('email');
    Helper.testStatusForField('email', validationError);
  });

  it('should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.populateField('password');
    Helper.testStatusForField('password', validationError);
  });

  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation', validationError);
  });

  it('should show valid name state if validation succeeds', () => {
    makeSut();

    Helper.populateField('name');
    Helper.testStatusForField('name');
  });

  it('should show valid email state if validation succeeds', () => {
    makeSut();

    Helper.populateField('email');
    Helper.testStatusForField('email');
  });

  it('should show valid password state if validation succeeds', () => {
    makeSut();

    Helper.populateField('password');
    Helper.testStatusForField('password');
  });

  it('should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut();

    Helper.populateField('passwordConfirmation');
    Helper.testStatusForField('passwordConfirmation');
  });

  it('should enable submit button if form is valid', () => {
    makeSut();

    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');

    Helper.testButtonIsDisabled('submit', false);
  });

  it('should load spinner on submit', async () => {
    makeSut();

    await simulateValidSubmit();
    Helper.testElementExists('spinner');
  });

  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut();

    const name = faker.random.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    });
  });

  it('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(1);
  });

  it('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });

    await simulateValidSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit();
    Helper.testElementText('main-error', error.message);
    Helper.testChildCount('error-wrap', 1);
  });

  test('should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSubmit();

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);

    expect(history.location.pathname).toBe('/');
  });

  test('should go to login page', async () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');

    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');
  });
});
