// import type { Project, Resume } from "../zod/index";
// import {
//   upsertProjectData,
//   getOrCreateResume,
//   deleteProjectData,
//   getProjectData,
// } from "../../prisma/index";

// export async function handleUpsertProjData(
//   telegramId: string,
//   data: Project,
// ): Promise<Resume | undefined> {
//   try {
//     return await upsertProjectData(telegramId, data);
//   } catch (error) {
//     console.log("error in handle project data");
//   }
// }

// export async function handleGetProjectData(telegramId: string) {
//   try {
//     return await getProjectData(telegramId);
//   } catch (error) {}
// }
// export async function handleDeleteProjData(telegramId: string, data: Project) {
//   try {
//     return await deleteProjectData(telegramId, data);
//   } catch (error) {
//     console.log("error in handle project data");
//   }
// }

// export async function handleGetOrCreateResume(
//   telegramId: string,
// ): Promise<Resume | undefined> {
//   try {
//     return await getOrCreateResume(telegramId);
//   } catch (error) {
//     console.log("error in getOrCreateResume");
//   }
// }
