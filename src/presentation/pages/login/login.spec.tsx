import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import {
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock,
  ValidationStub
} from '@/presentation/test';
import faker from '@faker-js/faker';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  };
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

const testElementExists = (sut: RenderResult, fieldname: string): void => {
  const element = sut.getByTestId(fieldname);
  expect(element).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldname: string,
  content: string
): void => {
  const element = sut.getByTestId(fieldname);
  expect(element.textContent).toBe(content);
};

describe('Login component', () => {
  afterEach(cleanup);

  it('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
  });

  it('should start with submit button disabled', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);

    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
  });

  it('should show valid email state if validation succeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    Helper.testStatusForField(sut, 'email');
  });

  it('should show valid password state if validation succeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    Helper.testStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);
    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  it('should load spinner on submit', async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);
    testElementExists(sut, 'spinner');
  });

  it('should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  it('should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);
    testElementText(sut, 'main-error', error.message);
    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  test('should present error if SaveAcccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit(sut);
    testElementText(sut, 'main-error', error.message);
    Helper.testChildCount(sut, 'error-wrap', 1);
  });

  test('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );

    expect(history.location.pathname).toBe('/');
  });

  test('should go to signup page', async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup');

    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
  });
});
