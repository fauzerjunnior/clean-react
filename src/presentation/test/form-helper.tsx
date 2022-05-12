import faker from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldname: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldname) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Sucesso!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = sut.getByTestId(fieldName);
  fireEvent.input(input, { target: { value } });
};

export const testElementExists = (
  sut: RenderResult,
  fieldname: string
): void => {
  const element = sut.getByTestId(fieldname);
  expect(element).toBeTruthy();
};

export const testElementText = (
  sut: RenderResult,
  fieldname: string,
  content: string
): void => {
  const element = sut.getByTestId(fieldname);
  expect(element.textContent).toBe(content);
};
