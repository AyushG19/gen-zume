type Mode = "Add" | "Edit";

export function getEducationStrings(mode: Mode) {
  const isEdit = mode === "Edit";
  const action = isEdit ? "Update" : "Enter";
  const title = isEdit ? "✏️ Edit Education" : "🎓 Add Education";

  return {
    step1: `🎓 <b>${title}</b>\n\n<b>Step 1:</b> ${action} qualification:\n<i>(e.g., SSC / HSC / B.S. in Computer Science)</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    step2: `<b>Step 2:</b> ${action} institution name:\n<i>(e.g., MIT, Stanford, Harvard)</i>`,
    step3: `<b>Step 3:</b> ${action} start year:\n<i>(e.g., 2020)</i>`,
    step4: `<b>Step 4:</b> ${action} end year:\n<i>(e.g., 2024 or Present)</i>`,
    success: isEdit
      ? "✅ Education updated successfully"
      : "✅ Education added successfully",
    error: isEdit
      ? "❌ Update failed, please try again"
      : "❌ Failed to add education, please try again",
  };
}
