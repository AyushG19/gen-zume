import type { SessionData } from "../../types";

export function getProjectStrings(mode: SessionData["mode"]) {
  const isEdit = mode === "Edit";

  return {
    step1: `<b>${isEdit ? "📝 Edit Project Info" : "➕ Add Project Info"}</b>\n\n<b>Step 1:</b> ${isEdit ? "Update" : "Enter"} project name: \n<i>(e.g., E-commerce Platform, Mobile App)</i>\n\n💡 <i>Tip: Type <b>exit</b>, <b>cancel</b>, or <b>quit</b> anytime to leave</i>`,
    step2: `<b>Step 2:</b> ${isEdit ? "Update" : "Enter"} key technologies used (separated by commas): \n<i>(e.g., React, Node.js, PostgreSQL, Docker)</i>`,
    step3: `<b>Step 3:</b> ${isEdit ? "Update a" : "Enter a"} key achievement or responsibility: \n<i>(Type END when done)</i>`,
    success: isEdit
      ? "✅ Project updated successfully"
      : "✅ Project added successfully",
    error: isEdit
      ? "Update failed, please try again"
      : "Adding failed, please try again",
  };
}
