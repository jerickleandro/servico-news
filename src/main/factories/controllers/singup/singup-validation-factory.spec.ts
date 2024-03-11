import { CompareFieldsValidation } from "../../../../validation/validators/compare-fields-validation";

import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../validation/validators";

import { type Validation } from "../../../../presentation/protocols/validation";

import { type EmailValidator } from "../../../../validation/protcols/email-validator";

import { makeSingUpValidation } from "./singup-validation-factory";

jest.mock("../../../../validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SingUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSingUpValidation();
    const validations: Validation[] = [];

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
