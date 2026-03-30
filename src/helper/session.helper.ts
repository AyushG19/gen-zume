import type { MyContext, SessionData } from "../types.js";

export class SessionHelper {
  initialize(): SessionData {
    return {
      mode: null,
      step: null,
      subFeild: null,
    };
  }
  updateSessionMode(ctx: MyContext, mode: SessionData["mode"]) {
    ctx.session.mode = mode;
  }
  updateSessionStep(ctx: MyContext, step: SessionData["step"]) {
    ctx.session.step = step;
  }
  updateSessionFeild(ctx: MyContext, feild: SessionData["subFeild"]) {
    ctx.session.subFeild = feild;
  }
}

export type SessionHelperType = SessionHelper;
