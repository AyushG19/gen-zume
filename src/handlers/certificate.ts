import type { Context } from "grammy";
import type { MyConversation } from "../types.js";

export async function AddCertificationConvo(
  conversation: MyConversation,
  ctx: Context,
) {
  await ctx.reply(
    "<b>Step 1:</b> Enter full name of the certification \ne.g., Project Management Professional\n\n<i>💡 Tip: Type <b>EXIT</b> at any step to cancel</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const certificationCtx = await conversation.wait();
  const certification = certificationCtx.message?.text;
  if (certification && certification.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 2:</b> Enter acronym/short code (if any): \n<i>(e.g., PMP, CISSP, AWS)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const acronymCtx = await conversation.wait();
  const acronym = acronymCtx.message?.text;
  if (acronym && acronym.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 3:</b> Enter issuing organization name: \n<i>(e.g., Project Management Institute)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const nameCtx = await conversation.wait();
  const orgName = nameCtx.message?.text;
  if (orgName && orgName.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 4:</b> Enter date earned/issued (MM/YYYY): \n<i>(e.g., 03/2024)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const dateCtx = await conversation.wait();
  const date = dateCtx.message?.text;
  if (date && date.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 5:</b> Enter credential ID or verification URL (optional): \n<i>(e.g., https://verify.example.com/ABC123)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const idOrUrlCtx = await conversation.wait();
  const idOrUrl = idOrUrlCtx.message?.text;
  if (idOrUrl && idOrUrl.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }
}
