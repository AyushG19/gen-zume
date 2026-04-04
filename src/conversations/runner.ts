import type { Context } from "grammy";
import type {
  MyConversation,
  MyContext,
  SingleString,
  InsertPayload,
} from "../types.js";
import type { Blueprint } from "./blueprints.js";
import type {
  Certification,
  Education,
  Experience,
  Project,
} from "../prisma/client.js";
import { record } from "zod";

export async function runBlueprint(
  conversation: MyConversation,
  ctx: Context,
  blueprint: Blueprint,
): Promise<Record<string, unknown> | null> {
  const result: Record<string, unknown> = {};

  for (const step of blueprint.steps) {
    if (step.type === "single") {
      let value: string | undefined;
      while (!value) {
        await ctx.reply(step.prompt, {
          parse_mode: "HTML",
          reply_markup: { force_reply: true, selective: true },
        });
        const c = await conversation.wait();
        value = c.message?.text?.trim();
      }
      result[step.key] = value;
    } else if (step.type === "array") {
      const items: string[] = [];
      let count = 0;
      const max = step.maxItems ?? 10;
      const end = step.endKeyword ?? "end";

      while (count < max) {
        await ctx.reply(step.prompt, {
          parse_mode: "HTML",
          reply_markup: { force_reply: true, selective: true },
        });
        const c = await conversation.wait();
        const val = c.message?.text?.trim();
        if (!val || new RegExp(`^${end}$`, "i").test(val)) break;
        items.push(val);
        count++;
      }
      result[step.key] = items;
    }
  }

  return result;
}
