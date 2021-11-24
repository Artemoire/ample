import * as crypto from "crypto";

export const encrypt = (data: string): string =>
  crypto.createHash('sha256').update(data).digest('hex');
