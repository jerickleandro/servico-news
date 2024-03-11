import { InvalidParamError } from "../../presentation/errors";
import { type EmailValidator } from "../protcols/email-validator";
import { type Validation } from "../../presentation/protocols/validation";

export class EmailValidation implements Validation {
  constructor(
    protected fieldName: string,
    protected emailValidator: EmailValidator
  ) {}

  validate(input: any): Error {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
