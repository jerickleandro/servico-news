import { MissingParamError } from "../../presentation/errors";
import { type Validation } from "../../presentation/protocols/validation";

export class RequiredFieldValidation implements Validation {
  constructor(protected fieldName: string) {}
  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
