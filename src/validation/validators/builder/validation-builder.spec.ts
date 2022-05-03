import {
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build();

    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });

  test('should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build();

    expect(validations).toEqual([new EmailValidation('any_field')]);
  });
});
