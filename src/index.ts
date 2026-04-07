import "dotenv/config";
import { Bot, InlineKeyboard, session, webhookCallback } from "grammy";
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";

import {
  getFeildsKeyboard,
  getSubFeildsKeyboard,
  isConvoActive,
} from "./utils/index.js";
import { SessionData, type MyContext } from "./types.js";

import {
  isFieldLeafField,
  isFieldWithSubfields,
  isIndex,
  isMultiStringLeafField,
  getResetSession,
} from "./helper/index.js";
import { DeleteConvo, MasterConvo } from "./conversations/master.js";
import { getOrCreateResume } from "../prisma/index.js";
import { createServer } from "http";
import { fetchUrl } from "./utils/api.js";

const token = process.env.TELEGRAM_BOT_KEY;
export const bot = new Bot<ConversationFlavor<MyContext>>(token!); //change in futurte

bot.use(
  session({
    initial: (): SessionData => ({
      telegramId: null,
      leafField: null,
      mode: null,
      selectedIndex: null,
      step: null,
      _loading: false,
      lastPdf: null,
    }),
  }),
);

bot.use(conversations());

bot.use(async (ctx, next) => {
  if (!ctx.from || ctx.session._loading) return;
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

bot.on("message::bot_command", async (ctx) => {
  const text = ctx.message.text;
  if (isConvoActive(ctx)) {
    await ctx.reply("Wait a req is already processing...");
    return;
  }
  if (text === "/start") {
    const res = await getOrCreateResume(ctx.session.telegramId!);
    console.log(res);
  } else if (text === "/add") {
    ctx.session.mode = "Add";
    await ctx.reply(
      "📝  <b>Add Resume Section</b>\nChoose what you want to add:",
      {
        reply_markup: getFeildsKeyboard(),
        parse_mode: "HTML",
      },
    );
  } else if (text === "/edit") {
    ctx.session.mode = "Edit";
    await ctx.reply(
      "✏️ <b>Edit Resume Section</b>\nChoose what you want to edit:",
      {
        reply_markup: getFeildsKeyboard(),
        parse_mode: "HTML",
      },
    );
  } else if (text === "/delete") {
    ctx.session.mode = "Delete";
    await ctx.reply(
      "🗑️ <b>Delete Resume Section</b>\nChoose what you want to delete:",
      { reply_markup: getFeildsKeyboard(), parse_mode: "HTML" },
    );
  } else if (text == "/pdf") {
    ctx.session._loading = true;
    const message = await ctx.reply("Bringing right to you...");
    const currTime = new Date().getTime();
    if (
      ctx.session.lastPdf &&
      currTime - ctx.session.lastPdf < 1000 * 60 * 15
    ) {
      await ctx.api.editMessageText(
        ctx.chat.id,
        message.message_id,
        "Too many inputs man, i am tired!!😫",
      );
      ctx.session._loading = false;
      return;
    }
    if (!ctx.session.lastPdf) ctx.session.lastPdf = currTime;

    const resume = await getOrCreateResume(ctx.session.telegramId!);
    const pdfDownloadUrl = await fetchUrl(resume);

    if (pdfDownloadUrl) {
      const kb = new InlineKeyboard().url("CLick", pdfDownloadUrl);
      await ctx.api.editMessageText(
        ctx.chat.id,
        message.message_id,
        "Here is your pdf 👇",
        { reply_markup: kb },
      );
    } else {
      await ctx.api.editMessageText(
        ctx.chat.id,
        message.message_id,
        "Sorry i forgot, Try again 😓!!",
      );
      ctx.session.lastPdf = null;
    }
    ctx.session._loading = false;
  }
});

bot.on("callback_query", async (ctx) => {
  // await ctx.conversation.enter("MasterConvo");
  console.log(ctx.session);
  const data = ctx.callbackQuery.data;
  const { mode } = ctx.session;

  if (!data || !mode) {
    console.log("no data");
    return;
  }

  //-1 if user choses fields with sub fielsds
  if (isFieldWithSubfields(data)) {
    if (ctx.session.step === "subfeild") {
      return;
    }
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
    ctx.session.step = "value";
    if (isConvoActive(ctx)) {
      await ctx.reply("Processing something else..");
      return;
    }

    await ctx.conversation.enter(
      mode === "Delete" ? "DeleteConvo" : "MasterConvo",
      mode,
    );

    ctx.session = getResetSession();
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
bot.catch((error) => {
  console.log(error);
});

const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  bot.api.deleteWebhook().then(() => {
    bot.start();
    console.log("Bot running in Long polling mode...");
  });
} else {
  const handleUpdates = webhookCallback(bot, "http", { onTimeout: "return" });

  const server = createServer((req, res) => {
    if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
      return;
    } else if (req.url === `/${token}` && req.method === "POST") {
      handleUpdates(req, res);
      return;
    }
    res.writeHead(404);
    res.end("Not found");
  });

  const port = process.env.PORT || 3000;
  const domain = process.env.DOMAIN;
  server.listen(port, async () => {
    console.log(`Server listening to port ${port}`);
    await bot.api.setWebhook(`${domain}/${token}`);
    console.log(`Webhook set`);
  });
}
