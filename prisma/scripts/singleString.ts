import { prisma } from "../lib/prisma";
import type { Fields, SingleStringLeafField } from "../types";

export async function upsertIntoSinglStrLeafField(
  telegramId: string,
  fieldName: string,
  data: string,
) {
  const res = await prisma.$runCommandRaw({
    update: "Resume",
    updates: [
      {
        q: { telegramId },
        u: {
          $set: { [fieldName]: data, updatedAt: new Date().toISOString() },
          $setOnInsert: {
            telegramId,
            createdAt: new Date().toISOString(),
          },
        },

        upsert: true,
      },
    ],
  });
  console.log(res);
}

export async function deleteSingleStrLeafFieldData(
  telegramId: string,
  fieldPath: string,
) {
  const res = await prisma.$runCommandRaw({
    update: "Resume",
    updates: [
      {
        q: { telegramId },
        u: { $unset: { [fieldPath]: "" }, updatedAt: new Date().toISOString() },
      },
    ],
  });
  console.log(res);
}
