import type {
  Project,
  Experience,
  Education,
  Certification,
  Award,
} from "../../generated/zod/index.js";

// ── PROJECTS ──────────────────────────────────────────────────────────────────

export function projectsToTelegramHtml(projects: Project[]): string {
  if (projects.length === 0)
    return "📂 No projects yet. Use /add to get started.";
  let str = "🚀 <b>Your Projects</b>\n<i>Tap a number to select</i>\n\n";
  projects.forEach((p, i) => {
    const bullets = p.bulletPoints.map((b) => `• <code>${b}</code>`).join("\n");
    str += `<b>${i + 1}.</b> <code>${p.projectName}</code> | <code><i>${p.technologies}</i></code>\n<blockquote>${bullets}</blockquote>\n\n`;
  });
  return str;
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

export function experienceToTelegramHtml(experiences: Experience[]): string {
  if (experiences.length === 0)
    return "💼 No experience yet. Use /add to get started.";
  let str = "💼 <b>Your Experience</b>\n<i>Tap a number to select</i>\n\n";
  experiences.forEach((e, i) => {
    str += `<b>${i + 1}.</b> <code>${e.jobTitle}</code> @ <code>${e.companyName}</code>\n`;
    str += `<blockquote><code>${e.startDate}</code> – <code>${e.endDate}</code>\n${e.description}</blockquote>\n\n`;
  });
  return str;
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────

export function educationToTelegramHtml(educations: Education[]): string {
  if (educations.length === 0)
    return "🎓 No education yet. Use /add to get started.";
  let str = "🎓 <b>Your Education</b>\n<i>Tap a number to select</i>\n\n";
  educations.forEach((e, i) => {
    str += `<b>${i + 1}.</b> <code>${e.qualification}</code>\n`;
    str += `<blockquote><code>${e.institution}</code>\n<code>${e.startYear}</code> – <code>${e.endYear}</code></blockquote>\n\n`;
  });
  return str;
}

// ── CERTIFICATION ─────────────────────────────────────────────────────────────

export function certificationsToTelegramHtml(certs: Certification[]): string {
  if (certs.length === 0)
    return "📜 No certifications yet. Use /add to get started.";
  let str = "📜 <b>Your Certifications</b>\n<i>Tap a number to select</i>\n\n";
  certs.forEach((c, i) => {
    const acronym = c.acronym ? ` (<code>${c.acronym}</code>)` : "";
    const credId = c.credentialId ? `\n<code>${c.credentialId}</code>` : "";
    str += `<b>${i + 1}.</b> <code>${c.certificationName}</code>${acronym}\n`;
    str += `<blockquote> <code>${c.organizationName}</code>\n<code>${c.dateEarned}</code>${credId}</blockquote>\n\n`;
  });
  return str;
}

// ── AWARDS ────────────────────────────────────────────────────────────────────

export function awardsToTelegramHtml(awards: Award[]): string {
  if (awards.length === 0) return "🏆 No awards yet. Use /add to get started.";
  let str = "🏆 <b>Your Awards</b>\n<i>Tap a number to select</i>\n\n";
  awards.forEach((a, i) => {
    str += `<b>${i + 1}.</b> <code>${a.awardName}</code>\n`;
    str += `<blockquote> <code>${a.issuer}</code>\n<code>${a.date}</code></blockquote>\n\n`;
  });
  return str;
}
