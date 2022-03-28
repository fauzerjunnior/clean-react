import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { Validation } from '@/presentation/protocols/validation';
import { ValidationSpy } from '@/presentation/test';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
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

  it('should have email status with required validation', () => {
    const { sut } = makeSut();
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should have password status with required validation', () => {
    const { sut } = makeSut();
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual('any_email');
  });

  it('should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual('any_password');
  });
});
