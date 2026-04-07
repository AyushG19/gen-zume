import type { MyContext, SessionData } from "../types";

export function getResetSession(): SessionData {
  return {
    leafField: null,
    mode: null,
    selectedIndex: null,
    step: null,
    telegramId: null,
    _loading: false,
    lastPdf: null,
  };
}
