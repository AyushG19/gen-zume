import type { Resume } from "@prisma/client";

export const normalizeResume = (raw: Resume) => ({
  //   id: raw._id?.$oid ?? null,
  //   telegramId: raw.telegramId ?? null,
  //   createdAt: raw.createdAt?.$date ? new Date(raw.createdAt.$date) : null,
  //   updatedAt: raw.updatedAt?.$date ? new Date(raw.updatedAt.$date) : null,

  header: raw.header
    ? {
        name: raw.header.name ?? null,
        phone: raw.header.phone ?? null,
        email: raw.header.email ?? null,
      }
    : null,

  links: raw.links
    ? {
        github: raw.links.github ?? null,
        linkedin: raw.links.linkedin ?? null,
        x: raw.links.x ?? null,
      }
    : null,

  skills: raw.skills
    ? {
        technical: raw.skills.technical ?? null,
        soft: raw.skills.soft ?? null,
        tools: raw.skills.tools ?? null,
      }
    : null,

  summary: raw.summary ?? null,

  experience: Array.isArray(raw.experience)
    ? raw.experience.map((exp: any) => ({
        jobTitle: exp.jobTitle ?? null,
        companyName: exp.companyName ?? null,
        startDate: exp.startDate ?? null,
        endDate: exp.endDate ?? null,
        description: exp.description ?? null,
      }))
    : [],

  projects: Array.isArray(raw.projects)
    ? raw.projects.map((proj: any) => ({
        projectName: proj.projectName ?? null,
        technologies: proj.technologies ?? null,
        bulletPoints: Array.isArray(proj.bulletPoints) ? proj.bulletPoints : [],
      }))
    : [],

  education: Array.isArray(raw.education)
    ? raw.education.map((edu: any) => ({
        qualification: edu.qualification ?? null,
        institution: edu.institution ?? null,
        startYear: edu.startYear ?? null,
        endYear: edu.endYear ?? null,
      }))
    : [],

  certification: Array.isArray(raw.certification)
    ? raw.certification.map((cert: any) => ({
        certificationName: cert.certificationName ?? null,
        acronym: cert.acronym ?? null,
        organizationName: cert.organizationName ?? null,
        dateEarned: cert.dateEarned ?? null,
        credentialId: cert.credentialId ?? null,
      }))
    : [],

  awards: Array.isArray(raw.awards)
    ? raw.awards.map((award: any) => ({
        awardName: award.awardName ?? null,
        issuer: award.issuer ?? null,
        date: award.date ?? null,
      }))
    : [],
});

// Return type you can use across the app
export type NormalizedResume = ReturnType<typeof normalizeResume>;
