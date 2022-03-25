import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login component', () => {
  it('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });

  it('should start with submit button disabled', () => {
    const { getByTestId } = render(<Login />);
    const submitButton = getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should have email status with required validation', () => {
    const { getByTestId } = render(<Login />);
    const emailStatus = getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should have password status with required validation', () => {
    const { getByTestId } = render(<Login />);
    const passwordStatus = getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
