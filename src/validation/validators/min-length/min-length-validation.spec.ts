import { InvalidFieldError } from '@/validation/errors';
import faker from '@faker-js/faker';
import { MinLengthValidation } from '@/validation/validators';

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength);

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });

    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate({ [field]: 5 });

    expect(error).toBeFalsy();
  });

  test('should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field', 5);
    const error = sut.validate({
      invalidField: faker.random.alphaNumeric(5)
    });

    expect(error).toBeFalsy();
  });
});
