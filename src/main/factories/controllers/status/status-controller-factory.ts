import { StatusController } from "../../../../presentation/controller/status/status-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeStatusController = (): Controller => {
  return makeLogControllerDecorator(new StatusController());
};
