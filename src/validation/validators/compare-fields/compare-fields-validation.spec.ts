import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe('ComparteFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word();

    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);

    expect(error).toBeFalsy();
  });
});