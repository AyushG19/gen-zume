import { InlineKeyboard, Keyboard } from "grammy";
import type { FieldsWithSubfeilds } from "../types.js";
import { getFeilds, getSubfeilds } from "../helper/index.js";

export function getFeildsKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  const feilds = getFeilds();
  feilds.forEach((feild, i) => {
    if (i % 3 === 0) kb.row();
    kb.text(feild);
  });
  return kb;
}

export function getSubFeildsKeyboard(
  feild: FieldsWithSubfeilds,
): InlineKeyboard {
  const kb = new InlineKeyboard();
  const subfeilds = getSubfeilds(feild);
  subfeilds.forEach((feild) => {
    kb.text(feild);
  });
  return kb;
}
