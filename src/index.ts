import "dotenv/config";
import { Bot, session } from "grammy";
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { FieldWithSubFields, LeafField } from "./types.js";
import { getFeildsKeyboard, getSubFeildsKeyboard } from "./utils/keyboars.js";
import { type MyContext } from "./types.js";
import { SessionHelper } from "./helper/session.helper.js";
import {
  AddCertificationConvo,
  AddEducationConvo,
  AddExperienceConvo,
  AddProjectConvo,
  AddSingleStringConvo,
} from "./handlers/index.js";
import {
  isFieldLeafField,
  isFieldWithSubfields,
  isMultiStringLeafField,
} from "./helper/feildType.helper.js";

const bot = new Bot<ConversationFlavor<MyContext>>(
  process.env.TELEGRAM_BOT_KEY!,
); //change in futurte
const sessionHelper = new SessionHelper();

bot.use(session({ initial: () => sessionHelper.initialize() }));
bot.use(conversations());
bot.use(createConversation(AddSingleStringConvo));
bot.use(createConversation(AddExperienceConvo));
bot.use(createConversation(AddProjectConvo));
bot.use(createConversation(AddEducationConvo));
bot.use(createConversation(AddCertificationConvo));

bot.on("message::bot_command", (ctx) => {
  const text = ctx.message.text;
  if (text === "/add") {
    sessionHelper.updateSessionMode(ctx, "Add");
    ctx.reply("📝 <b>Add Resume Section</b>\nChoose what you want to add:", {
      reply_markup: getFeildsKeyboard(),
      parse_mode: "HTML",
    });
  } else if (text === "/edit") {
    sessionHelper.updateSessionMode(ctx, "Edit");
    ctx.reply("✏️ <b>Edit Resume Section</b>\nChoose what you want to edit:", {
      reply_markup: getFeildsKeyboard(),
      parse_mode: "HTML",
    });
  } else if (text === "/delete") {
    sessionHelper.updateSessionMode(ctx, "Delete");
    ctx.reply(
      "🗑️ <b>Delete Resume Section</b>\nChoose what you want to delete:",
      { reply_markup: getFeildsKeyboard(), parse_mode: "HTML" },
    );
  }
});

const handleFieldsWithSubfields = async (
  ctx: MyContext,
  field: FieldWithSubFields,
) => {
  switch (field) {
    case "Header": {
      sessionHelper.updateSessionStep(ctx, "feild");
      await ctx.answerCallbackQuery();
      ctx.reply("🔍 <b>Select a sub-field:</b>", {
        reply_markup: getSubFeildsKeyboard(field),
        parse_mode: "HTML",
      });
      break;
    }
    case "Links": {
      sessionHelper.updateSessionStep(ctx, "feild");
      ctx.reply("🔍 <b>Select a sub-field:</b>", {
        reply_markup: getSubFeildsKeyboard(field),
        parse_mode: "HTML",
      });
      break;
    }
    case "Skills": {
      sessionHelper.updateSessionStep(ctx, "feild");
      ctx.reply("🔍 <b>Select a sub-field:</b>", {
        reply_markup: getSubFeildsKeyboard(field),
        parse_mode: "HTML",
      });
      break;
    }
  }
};

const handleLeafFields = async (ctx: MyContext, field: LeafField) => {
  console.log("name is here");
  if (isMultiStringLeafField(field)) {
    switch (field) {
      case "Awards": {
        break;
      }
      case "Experience": {
        sessionHelper.updateSessionFeild(ctx, field);
        await ctx.conversation.enter("AddExperienceConvo", field);
        break;
      }
      case "Projects": {
        sessionHelper.updateSessionFeild(ctx, field);
        await ctx.conversation.enter("AddProjectConvo", field);
        break;
      }
      case "Education": {
        sessionHelper.updateSessionFeild(ctx, field);
        await ctx.conversation.enter("AddEducationConvo", field);
        break;
      }
      case "Certification": {
        sessionHelper.updateSessionFeild(ctx, field);
        await ctx.conversation.enter("AddCertificationConvo", field);
        break;
      }
    }
  } else {
    sessionHelper.updateSessionFeild(ctx, field);
    await ctx.conversation.enter("AddSingleStringConvo", field);
  }
};

bot.on("callback_query", async (ctx) => {
  console.log(ctx.session);
  const data = ctx.callbackQuery.data;
  if (!data) {
    console.log("no data");
    return;
  }

  if (isFieldLeafField(data)) {
    await handleLeafFields(ctx, data);
  } else if (isFieldWithSubfields(data)) {
    await handleFieldsWithSubfields(ctx, data);
  }
});

bot.catch((error) => console.log(error));
bot.start();
console.log("BOT Running...");
