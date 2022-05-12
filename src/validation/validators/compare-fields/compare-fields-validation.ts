import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error {
    return this[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
