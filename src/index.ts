import "dotenv/config";
import {
  Bot,
  InlineKeyboard,
  Keyboard,
  session,
  type SessionFlavor,
} from "grammy";
import { handleAdd } from "./handlers/add.js";
import { Feilds } from "./types.js";
import { getFeildsKeyboard, getSubFeildsKeyboard } from "./utils/keyboars.js";
import { type SessionData, type MyContext } from "./types.js";
import { SessionHelper } from "./helper/session.helper.js";
import z from "zod";

const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_KEY!); //change in futurte
const sessionHelper = new SessionHelper();
// // Reply to any message with "Hi there!".
// bot.onText("message", (ctx) => {
//     if(ctx.hasText("/edit")){
//         ctx.fe
//     }
// })
bot.use(session({ initial: () => sessionHelper.initialize() }));
bot.on("message::bot_command", (ctx) => {
  const text = ctx.message.text;
  if (text === "/add") {
    sessionHelper.updateSessionMode(ctx, "add");
    ctx.reply("choose", { reply_markup: getFeildsKeyboard() });
  } else if (text === "/edit") {
    sessionHelper.updateSessionMode(ctx, "edit");
    ctx.reply("choose", { reply_markup: getFeildsKeyboard() });
  } else if (text === "/delete") {
    sessionHelper.updateSessionMode(ctx, "delete");
    ctx.reply("choose", { reply_markup: getFeildsKeyboard() });
  }
});

// const headerSubFeilds = new InlineKeyboard()
//   .text("Name", "name")
//   .text("Phone", "phone")
//   .text("Email", "email")
//   .text("Links", "links");

const headerSubFeilds = new Keyboard().text("Name").text("Phone");

bot.on("callback_query", (ctx) => {
  const data = Feilds.safeParse(ctx.callbackQuery.data);
  if (ctx.session.mode === null) return;
  if (!data.success) return;
  const cleanData = data.data;
  if (cleanData === "Header") {
    sessionHelper.updateSessionStep(ctx, "feild");
    ctx.reply("which sub feild", {
      reply_markup: getSubFeildsKeyboard(cleanData),
    });
  } else if (cleanData === "Summary") {
  }
  switch (cleanData) {
    case "Header": {
      sessionHelper.updateSessionStep(ctx, "feild");
      ctx.reply("which sub feild", {
        reply_markup: getSubFeildsKeyboard(cleanData),
      });
      break;
    }
    case "Links": {
      sessionHelper.updateSessionStep(ctx, "feild");
      ctx.reply("which sub feild", {
        reply_markup: getSubFeildsKeyboard(cleanData),
      });
      break;
    }
    case "Summary": {
      break;
    }
    case "Skills": {
      sessionHelper.updateSessionStep(ctx, "feild");
      ctx.reply("which sub feild", {
        reply_markup: getSubFeildsKeyboard(cleanData),
      });
    }
    case "Experience":
    case "Projects":
    case "Education":
    case "Certification":
    case "Awards":
  }
});

// bot.hears("Header", (ctx) => {
//   ctx.reply("which sub feild", {
//     reply_markup: getSubFeildsKeyboard("Header"),
//   });
// });

// bot.on("inline_query", async (ctx) => {
//   const query = ctx.inlineQuery.query;

//   const results = [
//     {
//       type: "article" as const,
//       id: "1",
//       title: "Hello",
//       input_message_content: {
//         message_text: "Hello 👋",
//       },
//     },
//   ];

//   await ctx.answerInlineQuery(results);
// });

bot.catch((error) => console.log(error));
bot.start();
console.log("BOT Running...");
