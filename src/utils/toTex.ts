// resumeTex.ts
// Each function maps 1:1 to a Prisma Resume field and returns a LaTeX string.
// All fields are conditional — missing data = section/line is omitted.

import type {
  Header,
  Links,
  Skills,
  Experience,
  Project,
  Education,
  Certification,
  Award,
} from "@prisma/client";

//  Escape special LaTeX characters
const e = (s: string | null | undefined): string => {
  if (!s) return "";
  return s
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
};

//  HEADER
export const getHeader = (
  header: Header | null,
  links: Links | null,
): string => {
  if (!header && !links) return "";

  const contactItems = [
    header?.phone
      ? String.raw`\raisebox{-0.1\height}\faPhone\ ${e(header.phone)}`
      : null,
    header?.email
      ? String.raw`\href{mailto:${e(header.email)}}{\raisebox{-0.2\height}\faEnvelope\ \underline{${e(header.email)}}}`
      : null,
    links?.linkedin
      ? String.raw`\href{https://${e(links.linkedin)}}{\raisebox{-0.2\height}\faLinkedin\ \underline{${e(links.linkedin)}}}`
      : null,
    links?.github
      ? String.raw`\href{https://${e(links.github)}}{\raisebox{-0.2\height}\faGithub\ \underline{${e(links.github)}}}`
      : null,
    links?.x
      ? String.raw`\href{https://${e(links.x)}}{\raisebox{-0.2\height}\faXTwitter\ \underline{${e(links.x)}}}`
      : null,
  ]
    .filter(Boolean)
    .join(" ~ ");

  return String.raw`
%----------HEADING----------
\begin{center}
${header?.name ? String.raw`    {\Huge \scshape ${e(header.name)}} \\ \vspace{1pt}` : ""}
    \small ${contactItems}
    \vspace{-8pt}
\end{center}`.trim();
};

//  SUMMARY
export const getSummary = (summary: string | null): string => {
  if (!summary?.trim()) return "";

  return String.raw`
%-----------SUMMARY-----------
\section{Summary}
  \small{${e(summary)}}
\vspace{-5pt}`.trim();
};

//  EDUCATION
export const getEducation = (education: Education[]): string => {
  if (!education?.length) return "";

  const entries = education
    .map((edu) => {
      const dateRange = [edu.startYear, edu.endYear]
        .filter(Boolean)
        .join(" -- ");
      return String.raw`
    \resumeSubheading
      {${e(edu.institution)}}{${e(dateRange)}}
      {${e(edu.qualification)}}{}`.trim();
    })
    .join("\n\n    ");

  return String.raw`
%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    ${entries}
  \resumeSubHeadingListEnd`.trim();
};

// SKILLS
export const getSkills = (skills: Skills | null): string => {
  if (!skills) return "";
  const { technical, tools, soft } = skills;
  if (!technical && !tools && !soft) return "";

  const lines = [
    technical
      ? String.raw`     \textbf{Languages / Tools}{: ${e(technical)}} \\`
      : null,
    tools ? String.raw`     \textbf{Developer Tools}{: ${e(tools)}} \\` : null,
    soft ? String.raw`     \textbf{Soft Skills}{: ${e(soft)}} \\` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return String.raw`
%-----------TECHNICAL SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
${lines}
    }}
 \end{itemize}
 \vspace{-16pt}`.trim();
};

// EXPERIENCE
export const getExperience = (experience: Experience[]): string => {
  if (!experience?.length) return "";

  const entries = experience
    .map((exp) => {
      const dateRange = [exp.startDate, exp.endDate]
        .filter(Boolean)
        .join(" -- ");

      // description stored as newline-separated bullet points
      const bullets = (exp.description ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => String.raw`        \resumeItem{${e(s)}}`)
        .join("\n");

      return String.raw`
    \resumeSubheading
      {${e(exp.companyName)}}{${e(dateRange)}}
      {${e(exp.jobTitle)}}{}
      \resumeItemListStart
${bullets}
      \resumeItemListEnd`.trim();
    })
    .join("\n\n    ");

  return String.raw`
%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
    ${entries}
  \resumeSubHeadingListEnd
\vspace{-16pt}`.trim();
};

// PROJECTS
export const getProjects = (projects: Project[]): string => {
  if (!projects?.length) return "";

  const entries = projects
    .map((proj, idx) => {
      const isLast = idx === projects.length - 1;

      const heading = proj.technologies
        ? String.raw`\textbf{${e(proj.projectName)}} $|$ \emph{${e(proj.technologies)}}`
        : String.raw`\textbf{${e(proj.projectName)}}`;

      const bullets = (proj.bulletPoints ?? [])
        .filter(Boolean)
        .map((b) => String.raw`        \resumeItem{${e(b)}}`)
        .join("\n");

      return String.raw`
    \resumeProjectHeading
      {${heading}}{}
      \resumeItemListStart
${bullets}
      \resumeItemListEnd${isLast ? "" : "\n      \\vspace{-13pt}"}`.trim();
    })
    .join("\n\n");

  return String.raw`
%-----------PROJECTS-----------
\section{Projects}
  \vspace{-5pt}
  \resumeSubHeadingListStart
${entries}
  \resumeSubHeadingListEnd
\vspace{-15pt}`.trim();
};

// CERTIFICATIONS
export const getCertifications = (certifications: Certification[]): string => {
  if (!certifications?.length) return "";

  const bullets = certifications
    .map((cert) => {
      const name = cert.acronym
        ? `${e(cert.certificationName)} (${e(cert.acronym)})`
        : e(cert.certificationName);
      const cred = cert.credentialId
        ? ` — Credential ID: ${e(cert.credentialId)}`
        : "";
      return String.raw`        \resumeItem{\textbf{${name}} — ${e(cert.organizationName)}, ${e(cert.dateEarned)}${cred}}`;
    })
    .join("\n");

  return String.raw`
%-----------CERTIFICATIONS-----------
\section{Certifications}
  \resumeSubHeadingListStart
      \resumeItemListStart
${bullets}
      \resumeItemListEnd
  \resumeSubHeadingListEnd
\vspace{-16pt}`.trim();
};

// AWARDS
export const getAwards = (awards: Award[]): string => {
  if (!awards?.length) return "";

  const bullets = awards
    .map(
      (a) =>
        String.raw`        \resumeItem{\textbf{${e(a.awardName)}} — ${e(a.issuer)}, ${e(a.date)}}`,
    )
    .join("\n");

  return String.raw`
%-----------AWARDS-----------
\section{Awards \& Achievements}
  \resumeSubHeadingListStart
      \resumeItemListStart
${bullets}
      \resumeItemListEnd
  \resumeSubHeadingListEnd
\vspace{-16pt}`.trim();
};

//PREAMBLE
const PREAMBLE = String.raw`\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-2pt}}}}
\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}`;

// Pass the full Prisma Resume object — sections render only if data exists.
export const generateResumeTex = (resume: {
  header?: Header | null;
  links?: Links | null;
  summary?: string | null;
  skills?: Skills | null;
  education?: Education[];
  experience?: Experience[];
  projects?: Project[];
  certification?: Certification[];
  awards?: Award[];
}): string => {
  const sections = [
    getHeader(resume.header ?? null, resume.links ?? null),
    getSummary(resume.summary ?? null),
    getEducation(resume.education ?? []),
    getSkills(resume.skills ?? null),
    getExperience(resume.experience ?? []),
    getProjects(resume.projects ?? []),
    getCertifications(resume.certification ?? []),
    getAwards(resume.awards ?? []),
  ]
    .filter(Boolean)
    .join("\n\n");

  return `${PREAMBLE}\n\n\\begin{document}\n\n${sections}\n\n\\end{document}\n`;
};
// normalizeResume.ts

export const normalizeResume = (raw: Record<string, any>) => ({
  id: raw._id?.$oid ?? null,
  telegramId: raw.telegramId ?? null,
  createdAt: raw.createdAt?.$date ? new Date(raw.createdAt.$date) : null,
  updatedAt: raw.updatedAt?.$date ? new Date(raw.updatedAt.$date) : null,

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
