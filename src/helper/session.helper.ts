import type { LeafField, MyContext, SessionData } from "../types.js";

export class SessionHelper {
  initialize(): SessionData {
    return {
      mode: null,
      step: null,
      leafField: null,
    };
  }
  updateSessionMode(ctx: MyContext, mode: SessionData["mode"]) {
    ctx.session.mode = mode;
  }
  updateSessionStep(ctx: MyContext, step: SessionData["step"]) {
    ctx.session.step = step;
  }
  updateSessionFeild(ctx: MyContext, feild: LeafField) {
    ctx.session.leafField = feild;
  }
}

export type SessionHelperType = SessionHelper;
