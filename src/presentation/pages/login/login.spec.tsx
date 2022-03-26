import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);

  return {
    sut,
  };
};

describe('Login component', () => {
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
});
