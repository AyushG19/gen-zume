import { getBlueprint } from "./blueprints";
import { runBlueprint } from "./runner";
import {
  deleteMultiStrLeafFieldData,
  deleteSingleStrLeafFieldData,
  insertIntoMultiStrLeafField,
  updateIntoMultiStrLeafField,
  upsertIntoSinglStrLeafField,
} from "../../prisma/index.js";
import {
  type MyConversation,
  type MyContext,
  type SessionData,
  type FieldData,
  InsertPayloadSchema,
  SingleStringSchema,
} from "../types.js";
import type { CallbackQueryContext, Context } from "grammy";
import { isMultiStringLeafField } from "../helper";

import { showEditableFields } from "../helper/fieldDisplay.helper";
import { getFieldPath } from "../helper/fieldPath.helper";

export async function MasterConvo(
  conversation: MyConversation,
  ctx: Context,
  mode: "Add" | "Edit",
) {
  const { leafField, telegramId } = await conversation.external(
    (
      ctx: MyContext,
    ): {
      leafField: SessionData["leafField"];
      telegramId: SessionData["telegramId"];
    } => ({
      leafField: ctx.session.leafField,
      telegramId: ctx.session.telegramId,
    }),
  );

  if (!mode || !leafField || !telegramId) {
    console.log("error in master ");
    return;
  }

  const blueprint = getBlueprint(leafField, mode);

  let buttonCtx: CallbackQueryContext<Context>;
  if (mode === "Edit" && isMultiStringLeafField(leafField)) {
    await showEditableFields(ctx, telegramId, leafField);

    buttonCtx = await conversation.waitForCallbackQuery(/^[0-9]+$/, {
      otherwise: (ctx) => ctx.reply("Please click a button! or type Exit"),
    });
  }
  const data = await runBlueprint(conversation, ctx, blueprint);
  if (!data) return;

  await conversation.external(async (ctx: MyContext) => {
    if (isMultiStringLeafField(leafField)) {
      const insertPayload = { fieldName: leafField, data };
      const cleanData = InsertPayloadSchema.safeParse(insertPayload);

      if (!cleanData.success) {
        console.log("in master");
        return;
      }

      if (mode === "Add")
        await insertIntoMultiStrLeafField(telegramId, cleanData.data);
      if (mode === "Edit") {
        const selectedIndex = Number(buttonCtx.callbackQuery.data);
        if (!selectedIndex) {
          console.log("error in contxt");
          return;
        }
        await updateIntoMultiStrLeafField(
          telegramId,
          cleanData.data,
          selectedIndex - 1,
        );
      }
      await ctx.reply(blueprint.success);
    } else {
      const cleanData = SingleStringSchema.safeParse(data);

      if (!cleanData.success) {
        console.log("in master");
        return;
      }

      const fieldPath = getFieldPath(leafField);
      await upsertIntoSinglStrLeafField(
        telegramId,
        fieldPath,
        cleanData.data.input,
      );
      await ctx.reply(blueprint.success);
    }
  });
}

export async function DeleteConvo(conversation: MyConversation, ctx: Context) {
  const { leafField, telegramId } = await conversation.external(
    (
      ctx: MyContext,
    ): {
      leafField: SessionData["leafField"];
      telegramId: SessionData["telegramId"];
    } => ({
      leafField: ctx.session.leafField,
      telegramId: ctx.session.telegramId,
    }),
  );

  if (!leafField || !telegramId) {
    console.log("error in master ");
    return;
  }

  let buttonCtx: CallbackQueryContext<Context>;
  let dataArr: FieldData | null;
  if (isMultiStringLeafField(leafField)) {
    dataArr = await showEditableFields(ctx, telegramId, leafField);

    buttonCtx = await conversation.waitForCallbackQuery(/^[0-9]+$/, {
      otherwise: (ctx) => ctx.reply("Please click a button! or type Exit"),
    });
  }

  await conversation.external(async (ctx: MyContext) => {
    if (isMultiStringLeafField(leafField)) {
      const selectedIndex = Number(buttonCtx.callbackQuery.data);
      if (!selectedIndex || !dataArr) {
        console.log("error in contxt");
        return;
      }
      await deleteMultiStrLeafFieldData(
        telegramId,
        dataArr[selectedIndex - 1]!,
      );
    } else {
      const fieldPath = getFieldPath(leafField);
      await deleteSingleStrLeafFieldData(telegramId, fieldPath);
    }
    await ctx.reply("Delete successfull");
  });
}
