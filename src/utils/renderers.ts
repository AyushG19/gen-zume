import type {
  Project,
  Experience,
  Education,
  Certification,
  Award,
} from "../../generated/zod/index.js";

const PUPPETEER_WRAPPER = (inner: string) => `
  <div style="font-family:Calibri,Arial,sans-serif;color:#000;padding:0.5rem 0;">
    ${inner}
  </div>
`;

const PUPPETEER_HEADER = (left: string, right: string) => `
  <div style="display:flex;justify-content:space-between;align-items:baseline;">
    ${left}
    <span style="font-size:10pt;white-space:nowrap;">${right}</span>
  </div>
`;

// ── PROJECTS ──────────────────────────────────────────────────────────────────

export function projectsToTelegramHtml_outdated(projects: Project[]): string {
  if (projects.length === 0)
    return "📂 No projects found. Use /add to add one.";
  let str = "<b>🚀 Your Projects</b>\n<i>Reply with a number to select</i>\n\n";
  projects.forEach((p, i) => {
    const bullets = p.bulletPoints.map((b) => `    • ${b}`).join("\n");
    str += `<b>${i + 1}. ${p.projectName}</b>\n<i>${p.technologies}</i>\n${bullets}\n\n─────────────────\n\n`;
  });
  return str;
}

export function projectToPuppeteerHtml(project: Project): string {
  const bullets = project.bulletPoints
    .map(
      (b) =>
        `<li style="font-size:10.5pt;line-height:1.4;margin-bottom:2px;">${b}</li>`,
    )
    .join("");
  return PUPPETEER_WRAPPER(`
    ${PUPPETEER_HEADER(
      `<span style="font-size:11pt;font-weight:700;">
        ${project.projectName}
        <span style="font-size:10pt;font-weight:400;font-style:italic;">| ${project.technologies}</span>
      </span>`,
      "",
    )}
    <ul style="margin:4px 0 0;padding-left:18px;">${bullets}</ul>
  `);
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

export function experienceToTelegramHtml_outdated(
  experiences: Experience[],
): string {
  if (experiences.length === 0)
    return "💼 No experience found. Use /add to add one.";
  let str =
    "<b>💼 Your Experience</b>\n<i>Reply with a number to select</i>\n\n";
  experiences.forEach((e, i) => {
    str += `<b>${i + 1}. ${e.jobTitle}</b> @ <i>${e.companyName}</i>\n`;
    str += `📅 ${e.startDate} – ${e.endDate}\n`;
    str += `${e.description}\n\n─────────────────\n\n`;
  });
  return str;
}

export function experienceToPuppeteerHtml(exp: Experience): string {
  return PUPPETEER_WRAPPER(`
    ${PUPPETEER_HEADER(
      `<span style="font-size:11pt;font-weight:700;">
        ${exp.jobTitle}
        <span style="font-size:10pt;font-weight:400;font-style:italic;">| ${exp.companyName}</span>
      </span>`,
      `${exp.startDate} – ${exp.endDate}`,
    )}
    <p style="font-size:10.5pt;margin:4px 0 0;line-height:1.5;">${exp.description}</p>
  `);
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────

export function educationToTelegramHtml_outdated(
  educations: Education[],
): string {
  if (educations.length === 0)
    return "🎓 No education found. Use /add to add one.";
  let str =
    "<b>🎓 Your Education</b>\n<i>Reply with a number to select</i>\n\n";
  educations.forEach((e, i) => {
    str += `<b>${i + 1}. ${e.qualification}</b>\n`;
    str += `🏫 <i>${e.institution}</i>\n`;
    str += `📅 ${e.startYear} – ${e.endYear}\n\n─────────────────\n\n`;
  });
  return str;
}

export function educationToPuppeteerHtml(edu: Education): string {
  return PUPPETEER_WRAPPER(`
    ${PUPPETEER_HEADER(
      `<span style="font-size:11pt;font-weight:700;">
        ${edu.qualification}
        <span style="font-size:10pt;font-weight:400;font-style:italic;">| ${edu.institution}</span>
      </span>`,
      `${edu.startYear} – ${edu.endYear}`,
    )}
  `);
}

// ── CERTIFICATION ─────────────────────────────────────────────────────────────

export function certificationsToTelegramHtml_outdated(
  certs: Certification[],
): string {
  if (certs.length === 0)
    return "📜 No certifications found. Use /add to add one.";
  let str =
    "<b>📜 Your Certifications</b>\n<i>Reply with a number to select</i>\n\n";
  certs.forEach((c, i) => {
    const acronym = c.acronym ? ` (${c.acronym})` : "";
    const credId = c.credentialId ? `\n🔑 <code>${c.credentialId}</code>` : "";
    str += `<b>${i + 1}. ${c.certificationName}${acronym}</b>\n`;
    str += `🏢 <i>${c.organizationName}</i>\n`;
    str += `📅 ${c.dateEarned}${credId}\n\n─────────────────\n\n`;
  });
  return str;
}

export function certificationToPuppeteerHtml(cert: Certification): string {
  const acronym = cert.acronym ? ` (${cert.acronym})` : "";
  const credId = cert.credentialId
    ? `<p style="font-size:10pt;margin:2px 0 0;color:#444;">ID: ${cert.credentialId}</p>`
    : "";
  return PUPPETEER_WRAPPER(`
    ${PUPPETEER_HEADER(
      `<span style="font-size:11pt;font-weight:700;">
        ${cert.certificationName}${acronym}
        <span style="font-size:10pt;font-weight:400;font-style:italic;">| ${cert.organizationName}</span>
      </span>`,
      cert.dateEarned,
    )}
    ${credId}
  `);
}

// ── AWARDS ────────────────────────────────────────────────────────────────────

export function awardsToTelegramHtml_outdated(awards: Award[]): string {
  if (awards.length === 0) return "🏆 No awards found. Use /add to add one.";
  let str = "<b>🏆 Your Awards</b>\n<i>Reply with a number to select</i>\n\n";
  awards.forEach((a, i) => {
    str += `<b>${i + 1}. ${a.awardName}</b>\n`;
    str += `🏢 <i>${a.issuer}</i>\n`;
    str += `📅 ${a.date}\n\n─────────────────\n\n`;
  });
  return str;
}

export function awardToPuppeteerHtml(award: Award): string {
  return PUPPETEER_WRAPPER(`
    ${PUPPETEER_HEADER(
      `<span style="font-size:11pt;font-weight:700;">
        ${award.awardName}
        <span style="font-size:10pt;font-weight:400;font-style:italic;">| ${award.issuer}</span>
      </span>`,
      award.date,
    )}
  `);
}
