type Mode = "Add" | "Edit";

export function getExperienceStrings(mode: Mode) {
  const isEdit = mode === "Edit";
  const action = isEdit ? "Update" : "Enter";
  const title = isEdit ? "✏️ Edit Experience" : "💼 Add Experience";

  return {
    step1: `💼 <b>${title}</b>\n\n<b>Step 1:</b> ${action} job title:\n<i>(e.g., Senior Marketing Manager, Software Engineer)</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    step2: `<b>Step 2:</b> ${action} company name:\n<i>(e.g., Acme Corp, Tech Solutions)</i>`,
    step3: `<b>Step 3:</b> ${action} start date:\n<i>(e.g., January 2020 or 01/2020)</i>`,
    step4: `<b>Step 4:</b> ${action} end date:\n<i>(e.g., March 2024 or Present)</i>`,
    step5: `<b>Step 5:</b> ${action} job description/responsibilities:\n<i>(e.g., Led development of microservices architecture)</i>`,
    success: isEdit
      ? "✅ Experience updated successfully"
      : "✅ Experience added successfully",
    error: isEdit
      ? "❌ Update failed, please try again"
      : "❌ Failed to add experience, please try again",
  };
}
