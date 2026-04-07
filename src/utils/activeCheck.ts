import type { MyContext } from "../types";

export function isConvoActive(ctx: MyContext): boolean {
  const active = ctx.conversation.active();
  if (Object.keys(active).length > 0) return true;
  return false;
}
