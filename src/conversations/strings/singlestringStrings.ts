type Mode = "Add" | "Edit";

const fieldMeta: Record<
  string,
  { emoji: string; label: string; example: string }
> = {
  // Header
  Name: { emoji: "👤", label: "full name", example: "e.g., John Doe" },
  Phone: {
    emoji: "📱",
    label: "phone number",
    example: "e.g., +91 98765 43210",
  },
  Email: {
    emoji: "📧",
    label: "email address",
    example: "e.g., john@example.com",
  },
  // Links
  Github: {
    emoji: "🐙",
    label: "GitHub profile URL",
    example: "e.g., https://github.com/username",
  },
  Linkedin: {
    emoji: "🔗",
    label: "LinkedIn profile URL",
    example: "e.g., https://linkedin.com/in/username",
  },
  X: {
    emoji: "🐦",
    label: "X (Twitter) profile URL",
    example: "e.g., https://x.com/username",
  },
  // Skills
  Technical: {
    emoji: "💻",
    label: "technical skills",
    example: "e.g., JavaScript, Python, SQL, Docker",
  },
  Soft: {
    emoji: "🤝",
    label: "soft skills",
    example: "e.g., Leadership, Communication, Teamwork",
  },
  Tools: {
    emoji: "🛠️",
    label: "tools",
    example: "e.g., Git, Figma, Jira, VS Code",
  },
  // Summary
  Summary: {
    emoji: "📝",
    label: "professional summary",
    example: "e.g., Experienced software engineer with 3+ years...",
  },
};

export function getSingleStringStrings(field: string, mode: Mode) {
  const isEdit = mode === "Edit";
  const action = isEdit ? "Update" : "Enter";
  const meta = fieldMeta[field] ?? {
    emoji: "✏️",
    label: field.toLowerCase(),
    example: "",
  };

  return {
    prompt: `${meta.emoji} <b>${isEdit ? "Edit" : "Add"} ${field}</b>\n\n${action} your ${meta.label}:\n<i>${meta.example}</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    success: `✅ <b>${field}</b> ${isEdit ? "updated" : "added"} successfully`,
    error: `❌ Failed to ${isEdit ? "update" : "add"} ${field}, please try again`,
  };
}
