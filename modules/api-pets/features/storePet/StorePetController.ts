import { BadRequest, NoContent } from "../../../api-core/CommonResults";
import { ControllerRequest } from "../../../api-core/ControllerRequest";
import { StorePetFeature } from "./StorePetFeature";

export class StorePetController {
  constructor(private feature: StorePetFeature) {
  }

  handle(request: ControllerRequest) {
    const name = request.payload?.name;
    const race = request.payload?.race || "muggle";
    const { type } = request.query;

    if (!type) return BadRequest("missing query param 'type'");
    if (!(type in ["dog", "cat"])) return BadRequest("query param 'type' should be one of ['dog', 'cat']");
    if (!name) return BadRequest("missing required property 'name' in request payload");

    this.feature.does({
      name,
      race,
      type
    });

    return NoContent;
  }
}