import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from "./status-controller-protocols";
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from "../../helpers/http/http-helper";

export class StatusController implements Controller {
  contrutor() {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ message: "The API is running!" });
  }
}
