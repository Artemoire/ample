import { BadRequest, Ok } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { StorePetFeature } from "./StorePetFeature";

export class StorePetController {
  constructor(private feature: StorePetFeature) {
  }

  handle(request: ControllerRequest) {
    const {
      name,
      race,
      type
    } = request.query;

    if (!type) return BadRequest("missing query param 'type'");
    if (!name) return BadRequest("mising query param 'name'");

    if (!["dog", "cat"].includes(type)) return BadRequest("query param 'type' should be one of ['dog', 'cat']");

    this.feature.does({
      name,
      race: race || "muggle",
      type
    });

    return Ok("success");
  }
}