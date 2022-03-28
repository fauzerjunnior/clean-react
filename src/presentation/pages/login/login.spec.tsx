import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { ValidationStub } from '@/presentation/test';
import faker from '@faker-js/faker';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
    validationStub,
  };
};

describe('Login component', () => {
  afterEach(cleanup);
  it('should not render spinner and error on start', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);
  });

  it('should start with submit button disabled', () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut();
    const emailInput = sut.getByTestId('email');

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');

    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut();
    const passwordInput = sut.getByTestId('password');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should show valid email state if validation succeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const emailInput = sut.getByTestId('email');

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId('email-status');

    expect(emailStatus.title).toBe('Sucesso!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('should show valid password state if validation succeds', () => {
    const { sut, validationStub } = makeSut();
    validationStub.errorMessage = null;
    const passwordInput = sut.getByTestId('password');

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId('password-status');

    expect(passwordStatus.title).toBe('Sucesso!');
    expect(passwordStatus.textContent).toBe('🟢');
  });
});
