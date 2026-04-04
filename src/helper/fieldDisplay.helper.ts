import type { Context } from "grammy";
import type { MultiStringLeafFieldArr } from "../types";
import {
  awardsToTelegramHtml,
  certificationsToTelegramHtml,
  educationToTelegramHtml,
  experienceToTelegramHtml,
  projectsToTelegramHtml,
} from "../utils/toHtml";
import { getOptionKeyboard } from "../utils/keyboars";
import { type FieldData } from "../types";
import { getMultiStrLeafFieldData } from "../../prisma/index";

const call = (ctx: Context, teleReply: string, index: number) => {
  ctx.reply(`${teleReply}`, {
    reply_markup: getOptionKeyboard(index),
    parse_mode: "HTML",
  });
};
export const showEditableFields = async (
  ctx: Context,
  telegramId: string,
  field: MultiStringLeafFieldArr,
): Promise<FieldData | null> => {
  let teleReply = "Nothing to Edit or Delete.Try adding use /add";
  switch (field) {
    case "Experience": {
      const dataArr = await getMultiStrLeafFieldData(telegramId, "Experience");
      if (!dataArr || dataArr.length === 0) break;
      teleReply = experienceToTelegramHtml(dataArr);
      call(ctx, teleReply, dataArr.length);
      return dataArr;
    }
    case "Projects": {
      const dataArr = await getMultiStrLeafFieldData(telegramId, "Projects");
      if (!dataArr || dataArr.length === 0) break;
      teleReply = projectsToTelegramHtml(dataArr);
      call(ctx, teleReply, dataArr.length);
      return dataArr;
    }
    case "Education": {
      const dataArr = await getMultiStrLeafFieldData(telegramId, "Education");
      if (!dataArr || dataArr.length === 0) break;
      teleReply = educationToTelegramHtml(dataArr);
      call(ctx, teleReply, dataArr.length);
      return dataArr;
    }
    case "Certification": {
      const dataArr = await getMultiStrLeafFieldData(
        telegramId,
        "Certification",
      );
      if (!dataArr || dataArr.length === 0) break;
      teleReply = certificationsToTelegramHtml(dataArr);
      call(ctx, teleReply, dataArr.length);
      return dataArr;
    }
    case "Awards": {
      const dataArr = await getMultiStrLeafFieldData(telegramId, "Awards");
      if (!dataArr || dataArr.length === 0) break;
      teleReply = awardsToTelegramHtml(dataArr);
      call(ctx, teleReply, dataArr.length);
      return dataArr;
    }
  }
  return null;
};
