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
        q: {
          telegramId,
          [fieldName]: { $exists: false },
        },
        u: {
          $set: {
            [fieldName]: data,
          },
          $setOnInsert: {
            telegramId,
          },
          $currentDate: {
            updatedAt: true,
            createdAt: true,
          },
        },
        upsert: true,
      },
    ],
  });

  console.log(res);
}

// export async function upertIntoSingleStrLeafField(telegramId:string,fieldName:string,data:string) {
//   const res = await prisma.resume.upsert({
//     where: { telegramId },
//     update:{}
// }) }

export async function deleteSingleStrLeafFieldData(
  telegramId: string,
  fieldPath: string,
) {
  const res = await prisma.$runCommandRaw({
    update: "Resume",
    updates: [
      {
        q: { telegramId },
        u: {
          $unset: { [fieldPath]: "" },
          $currentDate: { updatedAt: true },
        },
      },
    ],
  });
  console.log(res);
}
