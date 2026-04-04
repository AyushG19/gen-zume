import { InlineKeyboard, Keyboard } from "grammy";
import type { FieldWithSubFields } from "../types.js";
import { getFeilds, getSubfeilds } from "../helper/index.js";

export function getFeildsKeyboard(): InlineKeyboard {
  const kb = new InlineKeyboard();
  const feilds = getFeilds();
  feilds.forEach((feild, i) => {
    if (i % 3 === 0) kb.row();
    kb.text(feild, feild);
  });
  return kb;
}

export function getSubFeildsKeyboard(
  feild: FieldWithSubFields,
): InlineKeyboard {
  const kb = new InlineKeyboard();
  const subfeilds = getSubfeilds(feild);
  subfeilds.forEach((feild) => {
    kb.text(feild, feild);
  });
  return kb;
}

export function getOptionKeyboard(n: number) {
  const kb = new InlineKeyboard();
  for (let i = 1; i <= n; i++) {
    kb.text(i.toString());
  }
  return kb;
}
