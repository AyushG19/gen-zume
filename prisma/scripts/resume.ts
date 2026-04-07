import { prisma } from "../lib/prisma.js";
import type { Resume } from "@prisma/client";

export async function getOrCreateResume(telegramId: string): Promise<Resume> {
  const res = await prisma.resume.upsert({
    where: { telegramId: telegramId },
    update: {},
    create: { telegramId },
  });
  return res;
}
