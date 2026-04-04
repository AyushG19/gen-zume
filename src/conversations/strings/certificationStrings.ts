type Mode = "Add" | "Edit";

export function getCertificationStrings(mode: Mode) {
  const isEdit = mode === "Edit";
  const action = isEdit ? "Update" : "Enter";
  const title = isEdit ? "✏️ Edit Certification" : "📜 Add Certification";

  return {
    step1: `📜 <b>${title}</b>\n\n<b>Step 1:</b> ${action} full certification name:\n<i>(e.g., Project Management Professional)</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    step2: `<b>Step 2:</b> ${action} acronym/short code <i>(if any)</i>:\n<i>(e.g., PMP, CISSP, AWS-SAA)</i>`,
    step3: `<b>Step 3:</b> ${action} issuing organization name:\n<i>(e.g., Project Management Institute)</i>`,
    step4: `<b>Step 4:</b> ${action} date earned/issued <i>(MM/YYYY)</i>:\n<i>(e.g., 03/2024)</i>`,
    step5: `<b>Step 5:</b> ${action} credential ID or verification URL <i>(optional)</i>:\n<i>(e.g., https://verify.example.com/ABC123)</i>`,
    success: isEdit
      ? "✅ Certification updated successfully"
      : "✅ Certification added successfully",
    error: isEdit
      ? "❌ Update failed, please try again"
      : "❌ Failed to add certification, please try again",
  };
}
