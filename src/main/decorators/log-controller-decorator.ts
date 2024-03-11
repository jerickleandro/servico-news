import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from "../../presentation/protocols";
import { type LogErrorRepository } from "../../data/protocols/db/log/log-error-repository";
export class LogControllerDecorator implements Controller {
  constructor(
    protected controller: Controller,
    protected logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
