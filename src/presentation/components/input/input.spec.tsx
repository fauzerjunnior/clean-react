import Context from '@/presentation/context/form-context';
import faker from '@faker-js/faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import React from 'react';
import Input from './input';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );
};

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('should remove readOnly on focus', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);

    expect(input.readOnly).toBe(false);
  });
});
