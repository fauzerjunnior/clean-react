import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { CompareFieldsValidation } from '@/validation/validators';

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.internet.userName();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.words(4)
    });

    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    });
    expect(error).toBeFalsy();
  });
});
