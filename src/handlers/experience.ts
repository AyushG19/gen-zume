import type { Context } from "grammy";
import type { MyConversation } from "../types.js";

export async function AddExperienceConvo(
  conversation: MyConversation,
  ctx: Context,
) {
  const msg = await ctx.reply(
    "<b>Step 1:</b> Enter job title bold and clear: \n<i>(e.g., Senior Marketing Manager)</i>\n\n<i>💡 Tip: Type <b>EXIT</b> at any step to cancel</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const cnameCtx = await conversation.wait();
  const companyName = cnameCtx.message?.text;
  if (companyName && companyName.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  const msg1 = await ctx.reply(
    "<b>Step 2:</b> Enter the company name: \n<i>(e.g., Acme Corp, Tech Solutions)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const sYearCtx = await conversation.wait();
  const startYear = sYearCtx.message?.text;
  if (startYear && startYear.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 3:</b> Enter start date: \n<i>(e.g., January 2020 or 01/2020)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const eYearCtx = await conversation.wait();
  const endYear = eYearCtx.message?.text;
  if (endYear && endYear.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 4:</b> Enter job designation/title: \n<i>(e.g., Senior Software Engineer)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const designationCtx = await conversation.wait();
  const designation = designationCtx.message?.text;
  if (designation && designation.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    `${companyName},${designation},${startYear},${endYear},${designation}`,
  );
}
