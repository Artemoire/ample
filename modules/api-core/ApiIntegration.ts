import { ControllerDefinition } from "./ControllerDefinition";
import { ControllerRequest } from "./ControllerRequest";
import { ControllerResult } from "./ControllerResult";

interface MapRequest<TRequest> {
  (req: TRequest): ControllerRequest;
}

interface MapResult<TResult> {
  (res: ControllerResult): TResult;
}

export class ApiIntegration<TRequest, TResult> {
  constructor(
    private controller: ControllerDefinition,
    private mapRequest: MapRequest<TRequest>,
    private mapResult: MapResult<TResult>
  ) { }

  async handle(req: TRequest): Promise<TResult> {
    const mappedRequest = this.mapRequest(req);
    try {
      const res = await this.controller.handle(mappedRequest);
      const mappedResult = await this.mapResult(res);
      return mappedResult;
    } catch (error) {
      return await this.mapResult({
        code: 500,
        body: { message: "Internal Server Failure" }
      });
    }
  }
}