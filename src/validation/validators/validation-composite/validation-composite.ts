import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  // eslint-disable-next-line consistent-return
  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter((v) => v.field === fieldName);
    // eslint-disable-next-line no-restricted-syntax
    for (const validator of validators) {
      const error = validator.validate(fieldValue);

      if (error) {
        return error.message;
      }
    }
  }
}
