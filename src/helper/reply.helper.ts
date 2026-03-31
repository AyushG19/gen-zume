import type { LeafField, MultiStringLeafFieldArr } from "../types.js";

export const getReplyString = (
  field: Exclude<LeafField, MultiStringLeafFieldArr>,
): string => {
  switch (field) {
    case "Name":
      return `<b>Full Name:</b> \n<i>(e.g., John Michael Doe)</i>`;
    case "Phone":
      return `<b>Phone Number:</b> \n<i>(e.g., +1 (555) 123-4567)</i>`;
    case "Email":
      return `<b>Email Address:</b> \n<i>(e.g., john.doe@email.com)</i>`;
    case "Github":
      return `<b>GitHub Profile URL:</b> \n<i>(e.g., https://github.com/johndoe)</i>`;
    case "Linkedin":
      return `<b>LinkedIn Profile URL:</b> \n<i>(e.g., https://linkedin.com/in/johndoe)</i>`;
    case "X":
      return `<b>X/Twitter Profile URL:</b> \n<i>(e.g., https://x.com/johndoe)</i>`;
    case "Technical":
      return `<b>Technical Skills (separated by commas):</b> \n<i>(e.g., React, Node.js, PostgreSQL, Docker, Kubernetes)</i>`;
    case "Soft":
      return `<b>Soft Skills (separated by commas):</b> \n<i>(e.g., Leadership, Communication, Teamwork, Problem-Solving, Adaptability)</i>`;
    case "Tools":
      return `<b>Tools & Software (separated by commas):</b> \n<i>(e.g., Git, GitHub, Jira, Figma, VS Code, Excel)</i>`;
    case "Summary":
      return `<b>Professional Summary:</b> \n<i>(e.g., Experienced Full-Stack Developer with 5+ years of expertise. Passionate about building scalable applications.)</i>`;
  }
};
