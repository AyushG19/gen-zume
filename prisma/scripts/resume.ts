import { prisma } from "../lib/prisma.js";
import type { Resume } from "@prisma/client";

export async function getOrCreateResume(telegramId: string): Promise<Resume> {
  const res = await prisma.resume.findUnique({
    where: { telegramId: telegramId },
  });
  if (!res) {
    return await prisma.resume.create({ data: { telegramId } });
  }
  return res;
}
