import { prisma } from "../lib/prisma.js";
import {
  type FieldData,
  type FieldReturnTypeMap,
  type InsertPayload,
} from "../../src/types.js";
import { type InputJsonValue } from "@prisma/client/runtime/library.js";

export async function insertIntoMultiStrLeafField(
  telegramId: string,
  payload: InsertPayload,
): Promise<FieldData | null> {
  switch (payload.fieldName) {
    case "Experience": {
      const res = await prisma.resume.upsert({
        where: { telegramId },
        update: { experience: { push: payload.data } },
        create: {
          telegramId,
          experience: payload.data,
        },
      });
      return res.experience ?? null;
    }
    case "Projects": {
      const res = await prisma.resume.upsert({
        where: { telegramId },
        update: { projects: { push: payload.data } },
        create: {
          telegramId,
          projects: payload.data,
        },
      });
      return res.projects ?? null;
    }
    case "Education": {
      const res = await prisma.resume.upsert({
        where: { telegramId },
        update: { education: { push: payload.data } },
        create: {
          telegramId,
          education: payload.data,
        },
      });
      return res.education ?? null;
    }
    case "Certification": {
      const res = await prisma.resume.upsert({
        where: { telegramId },
        update: { certification: { push: payload.data } },
        create: {
          telegramId,
          certification: payload.data,
        },
      });
      return res.certification ?? null;
    }
    case "Awards": {
      const res = await prisma.resume.upsert({
        where: { telegramId },
        update: { awards: { push: payload.data } },
        create: {
          telegramId,
          awards: payload.data,
        },
      });
      return res.awards ?? null;
    }
  }
}

// export async function upsertIntoMultiStrLeafField(telegramId: string,
//   payload: InsertPayload,
//   index: number) {
//     const res = await prisma.$runCommandRaw({
//         update:"Resume",
//         updates:[{
//             u:{telegramId},
//             q:{ $set: {
//             [`${dbFieldName}.${index}`]: payload.data,
//             updatedAt: new Date().toISOString(),
//           }}
//         }]
//     })

// }
export async function updateIntoMultiStrLeafField(
  telegramId: string,
  payload: InsertPayload,
  index: number,
) {
  const dbFieldName = payload.fieldName.toLowerCase();
  const res = await prisma.$runCommandRaw({
    update: "Resume",
    updates: [
      {
        q: {
          telegramId,
        },
        u: {
          $set: {
            [`${dbFieldName}.${index}`]: payload.data,
          },
          $currentDate: { updatedAt: true },
        },
      },
    ] as unknown as InputJsonValue,
  });
  console.log(res);
}

export async function deleteMultiStrLeafFieldData(
  telegramId: string,
  data: FieldData[number],
) {
  const firstFieldName = Object.keys(data)[0] as string;
  const firstFieldValue = Object.values(data)[0] as string;
  const res = await prisma.$runCommandRaw({
    update: "Resume",
    updates: [
      {
        q: { telegramId },
        u: {
          $pull: {
            [firstFieldName]: [firstFieldValue],
          },
          $currentDate: { updatedAt: true },
        },
      },
    ],
  });
  console.log(res);
}

export async function getMultiStrLeafFieldData<
  T extends keyof FieldReturnTypeMap,
>(telegramId: string, field: T): Promise<FieldReturnTypeMap[T] | null> {
  switch (field) {
    case "Experience": {
      const res = await prisma.resume.findUnique({
        where: { telegramId },
        select: { experience: true },
      });

      return (res?.experience as FieldReturnTypeMap[T]) ?? null;
    }
    case "Projects": {
      const res = await prisma.resume.findUnique({
        where: { telegramId },
        select: { projects: true },
      });
      return (res?.projects as FieldReturnTypeMap[T]) ?? null;
    }
    case "Education": {
      const res = await prisma.resume.findUnique({
        where: { telegramId },
        select: { education: true },
      });
      return (res?.education as FieldReturnTypeMap[T]) ?? null;
    }
    case "Certification": {
      const res = await prisma.resume.findUnique({
        where: { telegramId },
        select: { certification: true },
      });
      return (res?.certification as FieldReturnTypeMap[T]) ?? null;
    }
    case "Awards": {
      const res = await prisma.resume.findUnique({
        where: { telegramId },
        select: { awards: true },
      });
      return (res?.awards as FieldReturnTypeMap[T]) ?? null;
    }
  }
}
