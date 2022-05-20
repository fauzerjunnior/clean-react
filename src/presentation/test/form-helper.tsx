import faker from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';

export const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  fieldname: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldname) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  fieldName: string,
  validationError = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(`${fieldName}`);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (fieldname: string): void => {
  const element = screen.getByTestId(fieldname);
  expect(element).toBeTruthy();
};

export const testElementText = (fieldname: string, content: string): void => {
  const element = screen.getByTestId(fieldname);
  expect(element.textContent).toBe(content);
};
