import type { Context } from "grammy";
import type { MyConversation } from "../types.js";

export async function AddEducationConvo(
  conversation: MyConversation,
  ctx: Context,
) {
  await ctx.reply(
    "<b>Step 1:</b> Enter qualification: \n<i>(e.g. SSC / HSC / B.S. in CS)</i>\n\n<i>💡 Tip: Type <b>EXIT</b> at any step to cancel</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const qualificationCtx = await conversation.wait();
  const qualification = qualificationCtx.message?.text;
  if (qualification && qualification.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 2:</b> Enter your institution: \n<i>(e.g., MIT, Stanford, Harvard)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const nameCtx = await conversation.wait();
  const instName = nameCtx.message?.text;
  if (instName && instName.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 3:</b> Enter start year: \n<i>(e.g., 2020 or 2020-2024)</i>",
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
    "<b>Step 4:</b> Enter end year: \n<i>(e.g. 2024 or Present)</i>",
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

  await ctx.reply(`${qualification},${instName},${startYear},${endYear}`);
}
