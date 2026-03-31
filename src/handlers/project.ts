import type { Context } from "grammy";
import type { MyConversation } from "../types.js";

export async function AddProjectConvo(
  conversation: MyConversation,
  ctx: Context,
) {
  const bulletPoints: string[] = [];
  await ctx.reply(
    "<b>Step 1:</b> Enter project name: \n<i>(e.g., E-commerce Platform, Mobile App)</i>\n\n<i>💡 Tip: Type <b>EXIT</b> at any step to cancel</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const pNameCtx = await conversation.wait();
  const projectName = pNameCtx.message?.text;
  if (projectName && projectName.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  await ctx.reply(
    "<b>Step 2:</b> Enter key technologies used (separated by commas): \n<i>(e.g., React, Node.js, PostgreSQL, Docker)</i>",
    {
      reply_markup: { force_reply: true, selective: true },
      parse_mode: "HTML",
    },
  );
  const techCtx = await conversation.wait();
  const technologies = techCtx.message?.text;
  if (technologies && technologies.toUpperCase() === "EXIT") {
    await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
      parse_mode: "HTML",
    });
    return;
  }

  while (true) {
    await ctx.reply(
      "<b>Step 3:</b> Enter a key achievement or responsibility: \n<i>(Type END when done or EXIT to cancel)</i>",
      {
        reply_markup: { force_reply: true, selective: true },
        parse_mode: "HTML",
      },
    );
    const bulletCtx = await conversation.wait();
    const line = bulletCtx.message?.text;
    if (line && line.toUpperCase() === "EXIT") {
      await ctx.reply("❌ Operation cancelled. Returning to main menu...", {
        parse_mode: "HTML",
      });
      return;
    }
    if (line === undefined || line === "END") {
      break;
    } else {
      bulletPoints.push(line);
    }
  }
  await ctx.reply(`${projectName},${technologies},${bulletPoints}`);
}
