import { InlineKeyboard, type Context } from "grammy";
import { getFeildsKeyboard } from "../utils/keyboars.js";
import type { MyContext, SessionData } from "../types.js";
import type { SessionHelperType } from "../helper/session.helper.js";

// const feildMenu = new InlineKeyboard()
//   .text("Header", "header")
//   .text("Settings", "settings");


export function handleAdd(sessionHelper:SessionHelperType,ctx: MyContext) {
  sessionHelper.updateSessionMode(ctx, "add");
  ctx.reply("choose", { reply_markup: getFeildsKeyboard().resized() });
}

export function handleCommand(sessionHelper:SessionHelperType,ctx: MyContext) {
  switch(ctx.command)
  sessionHelper.updateSessionMode(ctx, "add");
  ctx.reply("choose", { reply_markup: getFeildsKeyboard().resized() });
}
