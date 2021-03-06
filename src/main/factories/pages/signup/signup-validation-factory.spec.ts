import {
  MinLengthValidation,
  ValidationComposite,
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation
} from '@/validation/validators';
import { makeSignUpValidation } from '@/main/factories/pages';

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validation', () => {
    const composite = makeSignUpValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
    );
  });
});
