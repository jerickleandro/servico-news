import { type Validation } from "../../presentation/protocols/validation";

export class ValidationComposite implements Validation {
  constructor(protected validations: Validation[]) {}
  validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}
