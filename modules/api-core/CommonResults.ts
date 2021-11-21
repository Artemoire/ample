import { ControllerResult } from "./ControllerResult";

const MESSAGE_RESULT = (code: number, message: string): ControllerResult => ({
  code,
  body: { message }
})

export const NotFound = (message: string): ControllerResult => MESSAGE_RESULT(404, message);
export const BadRequest = (message: string): ControllerResult => MESSAGE_RESULT(400, message);
export const Ok = (message: string): ControllerResult => MESSAGE_RESULT(200, message);

export const NoContent: ControllerResult = {
  code: 204,
  body: undefined
}