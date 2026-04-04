import "dotenv/config";
import { Bot, session } from "grammy";
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

import { getFeildsKeyboard, getSubFeildsKeyboard } from "./utils/keyboars.js";
import { type MyContext } from "./types.js";
import { SessionHelper } from "./helper/session.helper.js";

import {
  isFieldLeafField,
  isFieldWithSubfields,
  isIndex,
  isMultiStringLeafField,
} from "./helper/feildType.helper.js";
import { DeleteConvo, MasterConvo } from "./conversations/master.js";

const bot = new Bot<ConversationFlavor<MyContext>>(
  process.env.TELEGRAM_BOT_KEY!,
); //change in futurte
const sessionHelper = new SessionHelper();

bot.use(session({ initial: () => sessionHelper.initialize() }));

bot.use(conversations());

bot.use(async (ctx, next) => {
  if (!ctx.from) return;
  const telegramId = String(ctx.from.id);

  if (!ctx.session.telegramId) {
    ctx.session.telegramId = telegramId;
  }
  await next();
});

bot.hears(/^(exit|cancel|quit)$/i, async (ctx) => {
  console.log("exiting");
  const convos = ctx.conversation.active();
  for (const convo of Object.keys(convos)) {
    await ctx.conversation.exit(convo);
    ctx.reply("<b>🔚 Process Exited!</b> Don't worry, no data was stored.", {
      parse_mode: "HTML",
    });
  }
});

bot.use(createConversation(MasterConvo, "MasterConvo"));
bot.use(createConversation(DeleteConvo, "DeleteConvo"));

bot.on("message::bot_command", (ctx) => {
  const text = ctx.message.text;
  if (text === "/add") {
    // sessionHelper.updateSessionMode(ctx, "Add");
    ctx.session.mode = "Add";
    ctx.reply("📝  <b>Add Resume Section</b>\nChoose what you want to add:", {
      reply_markup: getFeildsKeyboard(),
      parse_mode: "HTML",
    });
  } else if (text === "/edit") {
    // sessionHelper.updateSessionMode(ctx, "Edit");
    ctx.session.mode = "Edit";
    ctx.reply("✏️ <b>Edit Resume Section</b>\nChoose what you want to edit:", {
      reply_markup: getFeildsKeyboard(),
      parse_mode: "HTML",
    });
  } else if (text === "/delete") {
    ctx.session.mode = "Delete";
    // sessionHelper.updateSessionMode(ctx, "Delete");
    ctx.reply(
      "🗑️ <b>Delete Resume Section</b>\nChoose what you want to delete:",
      { reply_markup: getFeildsKeyboard(), parse_mode: "HTML" },
    );
  }
});

bot.on("callback_query", async (ctx) => {
  // await ctx.conversation.enter("MasterConvo");
  console.log(ctx.session);
  const data = ctx.callbackQuery.data;
  const { mode } = ctx.session;
  await ctx.answerCallbackQuery();

  if (!data || !mode) {
    console.log("no data");
    return;
  }

  //-1 if user choses fields with sub fielsds
  if (isFieldWithSubfields(data)) {
    ctx.session.step = "subfeild";
    ctx.reply(`🔍 <b>Select one to ${ctx.session.mode}:</b>`, {
      reply_markup: getSubFeildsKeyboard(data),
      parse_mode: "HTML",
    });
  }

  if (
    isIndex(data) &&
    ctx.session.leafField &&
    isMultiStringLeafField(ctx.session.leafField)
  ) {
    ctx.session.selectedIndex = Number(data);
  }

  if (isFieldLeafField(data)) {
    ctx.session.leafField = data;
    if (ctx.session.mode === "Delete") {
      await ctx.conversation.enter("DeleteConvo");
      return;
    }
    await ctx.conversation.enter("MasterConvo", ctx.session.mode);
  }
});

bot.on("message:text", async (ctx) => {
  if (ctx.message.text === "test") {
    // await updateIntoSingleStrLeafField(
    //   ctx.session.telegramId!,
    //   "Header",
    //   "Name",
    //   "tingu",
    // );
  }
});
bot.catch((error) => console.log(error));
bot.start();
console.log("BOT Running...");
