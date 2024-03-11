import {
  type Authentication,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation,
} from "./login-controller-protocols";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../../helpers/http/http-helper";

export class LoginController implements Controller {
  constructor(
    protected authentication: Authentication,
    protected validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return serverError(error);
    }
  }
}
