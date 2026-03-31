import {
  LeafField,
  MultiStringLeafFieldArr,
  type MyConversation,
} from "../types.js";
import { getReplyString } from "../helper/index.js";
import type { Context } from "grammy";

export async function AddSingleStringConvo(
  conversation: MyConversation,
  ctx: Context,
  leafField: Exclude<LeafField, MultiStringLeafFieldArr>,
) {
  const replyString = getReplyString(leafField);
  const msg = await ctx.reply(
    `${replyString}\n\n<i>💡 Tip: Type <b>EXIT</b> to cancel this step</i>`,
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const valueCtx = await conversation.wait();
  const value = valueCtx.message?.text;

  if (value && value.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  // await ctx.api.deleteMessage(ctx.chat!.id, msg.message_id);
  await ctx.reply(
    `✅ Successfully added <b>${leafField}</b> : <i>${value}</i>`,
    {
      parse_mode: "HTML",
    },
  );
}
