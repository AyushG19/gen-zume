import { prisma } from "../lib/prisma.js";

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
          $set: { [fieldName]: data, updatedAt: new Date() },
          $setOnInsert: {
            telegramId,
            createdAt: new Date(),
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
        u: { $unset: { [fieldPath]: "" }, updatedAt: new Date() },
      },
    ],
  });
  console.log(res);
}
