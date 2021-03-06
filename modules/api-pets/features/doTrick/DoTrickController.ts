import { BadRequest, NotFound, Ok } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { DoTrickFeature } from "./DoTrickFeature";

export class DoTrickController {
  constructor(private feature: DoTrickFeature) {
  }

  handle(request: ControllerRequest) {
    const { petName: name } = request.params;

    if (!name) return BadRequest("missing query param 'name'");

    const trick = this.feature.does(name);

    if (!trick) return NotFound(`pet '${name}' doesn't exist`);

    return Ok(trick);
  }
}