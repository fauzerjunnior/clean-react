import { InvalidCredentialsError } from '@/domain/errors';
import { ValidationStub } from '@/presentation/test';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication';
import faker from '@faker-js/faker';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react';
import React from 'react';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();

  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    sut,
    authenticationSpy
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

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Sucesso!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login component', () => {
  afterEach(cleanup);
  it('should not render spinner and error on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);
  });

  it('should start with submit button disabled', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);
  });

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationError);
  });

  it('should show valid email state if validation succeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });

  it('should show valid password state if validation succeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should load spinner on submit', () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  it('should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    populatePasswordField(sut);

    fireEvent.submit(sut.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);
    const mainError = sut.getByTestId('main-error');
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });
});
