type Mode = "Add" | "Edit";

export function getAwardStrings(mode: Mode) {
  const isEdit = mode === "Edit";
  const action = isEdit ? "Update" : "Enter";
  const title = isEdit ? "✏️ Edit Award" : "🏆 Add Award";

  return {
    step1: `🏆 <b>${title}</b>\n\n<b>Step 1:</b> ${action} award name:\n<i>(e.g., Employee of the Year, Dean's List)</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    step2: `<b>Step 2:</b> ${action} issuing organization:\n<i>(e.g., Google, University of Mumbai)</i>`,
    step3: `<b>Step 3:</b> ${action} date received <i>(MM/YYYY)</i>:\n<i>(e.g., 06/2023)</i>`,
    success: isEdit
      ? "✅ Award updated successfully"
      : "✅ Award added successfully",
    error: isEdit
      ? "❌ Update failed, please try again"
      : "❌ Failed to add award, please try again",
  };
}
