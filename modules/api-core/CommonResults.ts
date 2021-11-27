import { ControllerResult } from "./ControllerResult";

const MESSAGE_RESULT = (code: number, message: string): ControllerResult => ({
  code,
  body: { message }
})

export const BadRequest = (message: string): ControllerResult => MESSAGE_RESULT(400, message);
export const Unauthorized = (message: string): ControllerResult => MESSAGE_RESULT(401, message);
export const Forbidden = (message: string): ControllerResult => MESSAGE_RESULT(403, message);
export const NotFound = (message: string): ControllerResult => MESSAGE_RESULT(404, message);
export const Ok = (message: string): ControllerResult => MESSAGE_RESULT(200, message);
export const HereYouGo = (data: any): ControllerResult => ({ code: 200, body: data }); // TODO: i dont like this

export const NoContent: ControllerResult = {
  code: 204,
  body: undefined
}