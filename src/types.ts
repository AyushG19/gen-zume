import type { Context, SessionFlavor } from "grammy";
import { z } from "zod";

export const Feilds = z.enum([
  "Header",
  "Links",
  "Summary",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
]);
export type Feilds = z.infer<typeof Feilds>;
export const FeildsArr = Feilds.options;

export const FieldsWithSubfeilds = z.enum(["Header", "Links", "Skills"]);
export type FieldsWithSubfeilds = z.infer<typeof FieldsWithSubfeilds>;

export const HeaderSubFeilds = z.object({
  subfeilds: z.enum(["Name", "Phone", "Email"]),
});
export type HeaderSubFeilds = z.infer<typeof HeaderSubFeilds>;

export const LinksSubfeild = z.object({
  subfeilds: z.enum(["Github", "Linkedin", "X"]),
});
export type LinksSubfeild = z.infer<typeof LinksSubfeild>;

export const SkillsSubFeilds = z.object({
  subfeilds: z.enum(["Technical", "Soft", "Tools"]),
});
export type SkillsSubFeilds = z.infer<typeof SkillsSubFeilds>;

export const SessionData = z.object({
  mode: z.enum(["add", "edit", "delete"]).nullable(),
  step: z.enum(["feild", "subfeild", "value"]).nullable(),
  subFeild: z
    .union([HeaderSubFeilds, LinksSubfeild, SkillsSubFeilds])
    .nullable(),
});
export type SessionData = z.infer<typeof SessionData>;

export type MyContext = Context & SessionFlavor<SessionData>;
