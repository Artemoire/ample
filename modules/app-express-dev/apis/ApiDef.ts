import { Router } from "express";

export class ApiDef {
  constructor(
    public readonly router: Router,
    public readonly api: string
  ) { }

  static from(router: Router, api: string): ApiDef {
    return new ApiDef(router, api);
  }
}