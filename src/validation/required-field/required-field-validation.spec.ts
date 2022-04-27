import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  test('should return error if filed is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');

    expect(error).toEqual(new RequiredFieldError());
  });
});
