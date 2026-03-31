import { Conversation, type ConversationFlavor } from "@grammyjs/conversations";
import type { Context, SessionFlavor } from "grammy";
import { z } from "zod";

export const Fields = z.enum([
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
export type Fields = z.infer<typeof Fields>;
export const FeildsArr = Fields.options;

export const FieldWithSubFields = z.enum(["Header", "Links", "Skills"]);
export type FieldWithSubFields = z.infer<typeof FieldWithSubFields>;
export const FieldWithSubFieldsArr = FieldWithSubFields.options;

export const LeafFieldInFields = z.enum([
  "Summary",
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
]);
export type LeafFieldInFields = z.infer<typeof LeafFieldInFields>;

export const HeaderSubFeilds = z.enum(["Name", "Phone", "Email"]);
export type HeaderSubFeilds = z.infer<typeof HeaderSubFeilds>;

export const LinksSubfeild = z.enum(["Github", "Linkedin", "X"]);
export type LinksSubfeild = z.infer<typeof LinksSubfeild>;

export const SkillsSubFeilds = z.enum(["Technical", "Soft", "Tools"]);
export type SkillsSubFeilds = z.infer<typeof SkillsSubFeilds>;

export const LeafField = z.union([
  HeaderSubFeilds,
  LinksSubfeild,
  SkillsSubFeilds,
  LeafFieldInFields,
]);
export type LeafField = z.infer<typeof LeafField>;
export const LeafFieldArr = LeafField.options.flatMap(
  (o) => o.options,
) as Array<z.infer<typeof LeafField>>;
export const MultiStringLeafFieldArr = [
  "Experience",
  "Projects",
  "Education",
  "Certification",
  "Awards",
] as const;
export type MultiStringLeafFieldArr = (typeof MultiStringLeafFieldArr)[number];

export const SessionData = z.object({
  mode: z.enum(["Add", "Edit", "Delete"]).nullable(),
  step: z.enum(["feild", "subfeild", "value"]).nullable(),
  leafField: z
    .union([HeaderSubFeilds, LinksSubfeild, SkillsSubFeilds, LeafFieldInFields])
    .nullable(),
});

export type SessionData = z.infer<typeof SessionData>;

export type MyContext = ConversationFlavor<
  Context & SessionFlavor<SessionData>
>;
export type MyConversation = Conversation<MyContext, Context>;
