import { MissingParamError } from "../../presentation/errors";
import { type Validation } from "../../presentation/protocols/validation";
import { ValidationComposite } from "./validation-composite";

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};
interface SutTypes {
  validationStubs: Validation[]
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);
  return {
    validationStubs,
    sut,
  };
};

describe("Validation Composite", () => {
  test("Should return an error if any validation fails", () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_field" });

    expect(error).toEqual(new MissingParamError("field"));
  });
  test("Should return the first error if more the one validation fails", () => {
    const { sut, validationStubs } = makeSut();

    jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());

    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));

    const error = sut.validate({ field: "any_field" });

    expect(error).toEqual(new Error());
  });

  test("Should not return if validation succeeds", () => {
    const { sut } = makeSut();

    const error = sut.validate({ field: "any_field" });

    expect(error).toBeFalsy();
  });
});
